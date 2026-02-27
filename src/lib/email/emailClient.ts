import { prisma } from "../prisma";
import { DeliveryStatus, RecipientType, EmailEventType } from "@prisma/client";

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
    eventId: string;
    recipientId: string;
    recipientType: RecipientType;
    eventType: EmailEventType;
    templateVersion: string;
}

export async function sendEmailWithTracking(payload: EmailPayload) {
    // 1. Create PENDING Log
    const log = await prisma.emailLog.create({
        data: {
            eventId: payload.eventId,
            recipientId: payload.recipientId,
            recipientType: payload.recipientType,
            eventType: payload.eventType,
            templateVersion: payload.templateVersion,
            deliveryStatus: "PENDING"
        }
    });

    try {
        // Mock email transport (would be nodemailer, resend, etc.)
        // Simulate a success or failure
        const isSuccess = Math.random() > 0.05; // 95% success rate for simulation

        if (!isSuccess) {
            throw new Error("Simulated SMTP Transport Failure");
        }

        // 2. Mark SENT
        await prisma.emailLog.update({
            where: { id: log.id },
            data: {
                deliveryStatus: "SENT",
                sentAt: new Date()
            }
        });

    } catch (error: any) {
        // 3. Mark FAILED or BOUNCED
        // For simulation, let's say 20% of errors are soft FAILS (can retry), 80% are BOUNCES (hard fail)
        const isBounce = Math.random() > 0.2;
        const newStatus = isBounce ? "BOUNCED" : "FAILED";

        await prisma.emailLog.update({
            where: { id: log.id },
            data: {
                deliveryStatus: newStatus,
                errorMessage: error.message
            }
        });

        // 4. Implement Bounce Suppression Policy
        if (newStatus === "BOUNCED") {
            const bounceCount = await prisma.emailLog.count({
                where: {
                    recipientId: payload.recipientId,
                    deliveryStatus: "BOUNCED"
                }
            });

            if (bounceCount > 3) {
                await prisma.user.update({
                    where: { id: payload.recipientId },
                    data: { emailSuppressed: true }
                });
                console.warn(`[EMAIL_CLIENT] Suppressed User ${payload.recipientId} due to >3 bounces.`);
            }
        }

        throw error; // Rethrow for the EventBus to handle retries if applicable
    }
}
