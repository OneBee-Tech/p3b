import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { logger } from "@/lib/logger";
import { createTransport } from "nodemailer";
import prisma from "@/lib/prisma";

// Simple in-memory rate limiter per IP
// (For production scale, move this to Upstash Redis alongside BullMQ)
const rateLimitMap = new Map<string, { count: number, resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, consent, _gotcha } = body;

        // 1. Honeypot Check (Anti-Bot)
        if (_gotcha) {
            logger.warn({ msg: "Bot honeypot triggered on newsletter sign up" });
            // Return success to fake out the bot
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 2. IP Rate Limiting Extraction
        const headersList = await headers();
        const forwarded = headersList.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(',')[0] : "unknown_ip";
        // Anonymize IP before logging per GDPR/Privacy rules
        const maskedIp = ip !== "unknown_ip" ? ip.replace(/\.\d+$/, '.xxx') : "unknown_ip";

        // 3. Apply Rate Limits
        const now = Date.now();
        const record = rateLimitMap.get(ip);
        if (record && record.resetAt > now) {
            if (record.count >= MAX_REQUESTS) {
                logger.warn({ msg: "Newsletter rate limit exceeded", ip: maskedIp });
                return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
            }
            record.count += 1;
        } else {
            rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        }

        // 4. Basic Validation
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
        }

        if (!consent) {
            return NextResponse.json({ error: "Consent is legally required to subscribe." }, { status: 400 });
        }

        // 5. Audit Trace Logging (Without logging raw Emails per rules)
        logger.info({
            msg: "Newsletter Subscription Request",
            event: "NEWSLETTER_OPT_IN",
            consentGiven: true,
            maskedIp,
            domain: email.split('@')[1] // Log only the domain to avoid PII leak
        });

        // 6. Persist Subscriber to Database (upsert prevents duplicates)
        await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: { isActive: true }, // Re-activate if they previously unsubscribed
            create: { email },
        });

        // 7. Send Welcome Auto-Response Email
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
                to: email, // Directly to the subscriber
                subject: "Welcome to OneDollarOneChild!",
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #1a202c; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h2 style="color: #020817; margin-top: 0;">Welcome to the Movement!</h2>
                        <p>Thank you for subscribing to OneDollarOneChild.</p>
                        <p>You have successfully joined our exclusive mailing list. You will now receive verifiable impact stories, emergency appeals, and transparency updates directly to this inbox.</p>
                        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">If you received this in error, you can safely ignore it. You can unsubscribe at any time.</p>
                    </div>
                `,
            });
            logger.info({ msg: "Sent welcome email", domain: email.split('@')[1] });
        } catch (emailErr: any) {
            logger.error({ msg: "Failed to send welcome email", error: emailErr.message });
            // Do not fail the request if the email dispatch drops
        }

        return NextResponse.json({ success: true, message: "Subscription received" }, { status: 200 });
    } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        logger.error({ msg: "Newsletter Signup Failed", error: errorMsg });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
