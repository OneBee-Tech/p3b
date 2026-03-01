"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createTransport } from "nodemailer";

export interface DispatchResult {
    success: boolean;
    sent: number;
    failed: number;
    error?: string;
}

export async function dispatchNewsletter(
    subject: string,
    htmlBody: string
): Promise<DispatchResult> {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return { success: false, sent: 0, failed: 0, error: "Unauthorized" };
    }

    if (!subject?.trim() || !htmlBody?.trim()) {
        return { success: false, sent: 0, failed: 0, error: "Subject and body are required." };
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
        where: { isActive: true },
        select: { email: true },
    });

    if (subscribers.length === 0) {
        return { success: false, sent: 0, failed: 0, error: "No active subscribers found." };
    }

    const transport = createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    let sent = 0;
    let failed = 0;

    const wrappedHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a202c;">
            ${htmlBody}
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center;">
                You're receiving this because you subscribed to OneDollarOneChild updates. 
                To unsubscribe, reply with "Unsubscribe" in the subject line.
            </p>
        </div>
    `;

    // Send to each subscriber - small list safe, large list use BullMQ queue
    for (const { email } of subscribers) {
        try {
            await transport.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject,
                html: wrappedHtml,
            });
            sent++;
        } catch {
            failed++;
        }
    }

    return { success: true, sent, failed };
}
