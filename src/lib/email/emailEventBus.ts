import { prisma } from "../prisma";
import { EmailEventType, RecipientType } from "@prisma/client";
import { TemplateRegistry } from "./templateRegistry";
import { sendEmailWithTracking } from "./emailClient";

interface DispatchPayload {
    eventType: EmailEventType;
    recipientId: string;
    recipientType: RecipientType;
    entityId: string; // Used for idempotency mapping (e.g. childId, reportId)
    data: any; // Dynamic data for the template
    isCritical?: boolean;
}

export async function dispatchEmailEvent(payload: DispatchPayload, retryCount = 0) {
    // Fire and Forget. We do not await this in the main execution logic unless strictly needed.
    // We execute the processing logic asynchronously.
    Promise.resolve().then(async () => {
        try {
            // 1. Check User Suppressed Status
            const user = await prisma.user.findUnique({
                where: { id: payload.recipientId },
                include: { emailPreferences: true }
            });

            if (!user) return;
            if (user.emailSuppressed && !payload.isCritical) {
                console.log(`[EVENT_BUS] Skipping ${payload.eventType} to ${payload.recipientId} - User Suppressed`);
                return;
            }

            // 2. Check User Preferences
            const prefs = user.emailPreferences;
            if (prefs && !payload.isCritical) {
                if (payload.eventType === "REPORT_VERIFIED" && !prefs.receiveImpactUpdates) return;
                if (payload.eventType === "MILESTONE_LOGGED" && !prefs.receiveMilestones) return;
                if (payload.eventType === "CSR_SNAPSHOT_READY" && !prefs.receiveCSRReports) return;
            }

            // 3. Idempotency Check
            const eventId = `${payload.eventType}-${payload.recipientId}-${payload.entityId}`;
            const existingLog = await prisma.emailLog.findUnique({
                where: { eventId }
            });

            if (existingLog) {
                console.log(`[EVENT_BUS] Idempotency blocked duplicate ${eventId}`);
                return;
            }

            // 4. Event Throttling Governance (48 hours per eventType per user)
            if (!payload.isCritical) {
                const recentLog = await prisma.emailLog.findFirst({
                    where: {
                        recipientId: payload.recipientId,
                        eventType: payload.eventType,
                        createdAt: { gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
                    }
                });

                if (recentLog) {
                    console.warn(`[EVENT_BUS] Throttled ${eventId}. Sent within last 48h.`);
                    return;
                }
            }

            // 5. Template Resolution
            const template = TemplateRegistry[payload.eventType];
            if (!template) throw new Error("Template not found for EventType");

            const subject = template.subject(payload.data);
            const html = template.html(payload.data);

            // 6. Dispatch to Client
            await sendEmailWithTracking({
                to: user.email,
                subject,
                html,
                eventId,
                recipientId: payload.recipientId,
                recipientType: payload.recipientType,
                eventType: payload.eventType,
                templateVersion: template.version
            });

            console.log(`[EVENT_BUS] Successfully processed ${eventId}`);

        } catch (error) {
            console.error(`[EVENT_BUS] Processing failed for ${payload.eventType}`, error);

            if (retryCount < 2) {
                console.log(`[EVENT_BUS] Retrying ${payload.eventType} for ${payload.recipientId} in 5s (Attempt ${retryCount + 1})`);
                setTimeout(() => {
                    dispatchEmailEvent(payload, retryCount + 1);
                }, 5000); // 5 sec retry backoff simulation
            } else {
                console.error(`[EVENT_BUS] Exhausted retries for ${payload.eventType} to ${payload.recipientId}`);
            }
        }
    });
}
