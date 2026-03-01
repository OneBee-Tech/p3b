"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTransport } from "nodemailer";

export async function submitReferral(formData: FormData) {
    const referrerName = formData.get("referrerName") as string;
    const email = formData.get("email") as string;
    const childLocation = formData.get("childLocation") as string;
    const educationStatus = formData.get("educationStatus") as string;
    const urgencyLevel = formData.get("urgencyLevel") as any;
    const notes = formData.get("notes") as string;

    // 1. Strict Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    // 2. Database-backed Rate Limiting (Max 3 submissions per email per 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentSubmissions = await prisma.referral.count({
        where: {
            email: email,
            createdAt: {
                gte: twentyFourHoursAgo
            }
        }
    });

    if (recentSubmissions >= 3) {
        throw new Error("Rate limit exceeded. Please try again tomorrow.");
    }

    // 3. Ingestion
    await prisma.referral.create({
        data: {
            referrerName,
            email,
            childLocation,
            educationStatus,
            urgencyLevel: urgencyLevel || "LOW",
            notes: notes || null,
            status: "PENDING"
        }
    });

    // 4. Dispatch Admin Notification via NodeMailer
    try {
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
            to: process.env.EMAIL_FROM, // Send to Admin
            subject: `New Child Referral: ${childLocation} [${urgencyLevel}]`,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>New Child Referral Received</h2>
                    <p><strong>Referrer:</strong> ${referrerName} (${email})</p>
                    <p><strong>Location:</strong> ${childLocation}</p>
                    <p><strong>Education Status:</strong> ${educationStatus}</p>
                    <p><strong>Urgency:</strong> ${urgencyLevel}</p>
                    <div style="background: #f4f4f4; padding: 15px; margin-top: 15px;">
                        <p><strong>Notes:</strong><br/>${notes}</p>
                    </div>
                    <p style="margin-top: 20px;"><small>Manage this referral at /admin/referrals</small></p>
                </div>
            `,
        });
    } catch (err: any) {
        console.error("[REFERRAL EMAIL] Failed to notify admin:", err.message ?? err);
        // We do not throw here to avoid failing the ingestion transaction.
    }

    revalidatePath("/admin/referrals");
    redirect("/refer?success=true");
}
