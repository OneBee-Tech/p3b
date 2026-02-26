import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

// --- Sanitizer: strip HTML tags -----------------------------------------
function sanitize(str: string): string {
    return str.replace(/<[^>]*>/g, "").trim();
}

// --- In-memory rate limiter (IP → [timestamps]) -------------------------
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
    if (timestamps.length >= RATE_LIMIT) return true;
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    return false;
}

const VALID_TYPES = ["GENERAL", "SPONSORSHIP", "REFER_CHILD", "REQUEST_ASSISTANCE", "PARTNERSHIP", "MEDIA"];

// Generate a cuid-like unique ID without depending on Prisma's cuid generator
function generateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 10);
    return `c${timestamp}${random}`;
}

export async function POST(req: Request) {
    try {
        // --- Rate limiting ------------------------------------------------
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many submissions. Please wait before trying again." },
                { status: 429 }
            );
        }

        // --- Parse & validate --------------------------------------------
        const body = await req.json();
        const name = sanitize(body.name ?? "");
        const email = sanitize(body.email ?? "");
        const inquiryType = (body.inquiryType ?? "").toUpperCase();
        const message = sanitize(body.message ?? "");

        const errors: string[] = [];
        if (!name) errors.push("Name is required.");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.");
        if (!VALID_TYPES.includes(inquiryType)) errors.push("Inquiry type is required.");
        if (!message) errors.push("Message is required.");
        if (message.length > 1000) errors.push("Message must be 1000 characters or fewer.");
        if (errors.length) return NextResponse.json({ error: errors.join(" ") }, { status: 400 });

        // --- DB write via raw SQL (bypasses generated client model issues) -
        const id = generateId();
        const now = new Date();

        await prisma.$executeRaw`
            INSERT INTO "ContactInquiry" (id, name, email, "inquiryType", message, status, "isArchived", "createdAt", "updatedAt")
            VALUES (
                ${id},
                ${name},
                ${email},
                ${inquiryType}::"InquiryType",
                ${message},
                'NEW'::"InquiryStatus",
                false,
                ${now},
                ${now}
            )
        `;

        // --- Email notification (non-blocking) ----------------------------
        const formattedType = inquiryType.replace(/_/g, " ");
        const timestamp = now.toLocaleString("en-US", { timeZone: "Asia/Karachi" });

        sendEmailNotification({ name, email, inquiryType: formattedType, message, timestamp }).catch(err => {
            console.error("[CONTACT] Email notification failed (non-fatal):", err);
        });

        return NextResponse.json({ success: true, id });

    } catch (err: any) {
        console.error("[CONTACT] Error:", err.message ?? err);
        return NextResponse.json({ error: "Could not save your message. Please try again." }, { status: 500 });
    }
}

// --- Email helper ---------------------------------------------------------
async function sendEmailNotification(data: {
    name: string;
    email: string;
    inquiryType: string;
    message: string;
    timestamp: string;
}) {
    const { createTransport } = await import("nodemailer");
    const transport = createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM,
        subject: `New Contact Inquiry: ${data.inquiryType}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 12px;">
                <h2 style="color: #1a202c;">New Contact Inquiry</h2>
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
                    <tr><td style="padding: 12px 16px; font-weight: bold; background: #f1f5f9; width: 140px;">Name</td><td style="padding: 12px 16px;">${data.name}</td></tr>
                    <tr><td style="padding: 12px 16px; font-weight: bold; background: #f1f5f9;">Email</td><td style="padding: 12px 16px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
                    <tr><td style="padding: 12px 16px; font-weight: bold; background: #f1f5f9;">Type</td><td style="padding: 12px 16px;">${data.inquiryType}</td></tr>
                    <tr><td style="padding: 12px 16px; font-weight: bold; background: #f1f5f9;">Received</td><td style="padding: 12px 16px;">${data.timestamp}</td></tr>
                </table>
                <div style="margin-top: 20px; padding: 16px; background: white; border-left: 4px solid #d4af37; border-radius: 4px;">
                    <p style="font-weight: bold; color: #1a202c; margin: 0 0 8px;">Message</p>
                    <p style="color: #4a5568; margin: 0; white-space: pre-wrap;">${data.message}</p>
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #a0aec0;">OneDollarOneChild — Manage this inquiry at /admin/inquiries</p>
            </div>
        `,
    });
}
