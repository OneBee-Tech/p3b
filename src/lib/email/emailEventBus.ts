import { prisma } from "../prisma";
import { EmailEventType, RecipientType } from "@prisma/client";
import { TemplateRegistry } from "./templateRegistry";
import { calculateDispatchDelay } from "../scheduling/timezoneDispatcher";
import { emailQueue } from "../queue/queueClient";
import { logger } from "../logger";

interface DispatchPayload {
    eventType: EmailEventType;
    recipientId: string;
    recipientType: RecipientType;
    entityId: string; // Used for idempotency mapping (e.g. childId, reportId)
    data: any; // Dynamic data for the template
    isCritical?: boolean;
}

export async function dispatchEmailEvent(payload: DispatchPayload) {
    // We now await the ingestion to guarantee it hits Redis before Http Returns
    try {
        // 1. Check User Suppressed Status
        const user = await prisma.user.findUnique({
            where: { id: payload.recipientId },
            include: { emailPreferences: true }
        });

        if (!user) return;
        if (user.emailSuppressed && !payload.isCritical) {
            logger.info({ recipientId: payload.recipientId, eventType: payload.eventType }, `[EVENT_BUS] Skipping email - User Suppressed`);
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
            logger.info({ eventId }, `[EVENT_BUS] Idempotency blocked duplicate.`);
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
                logger.warn({ eventId }, `[EVENT_BUS] Throttled duplicate dispatch. Sent within last 48h.`);
                return;
            }
        }

        // 5. Template Resolution
        const template = TemplateRegistry.getTemplate(payload.eventType, user.preferredLocale);
        if (!template) {
            logger.error({ eventType: payload.eventType }, "Template not found for EventType");
            return;
        }

        const subject = template.subject(payload.data);
        const html = template.html(payload.data);

        // 6. Timezone Aware Scheduling Delay
        const delayMs = payload.isCritical ? 0 : calculateDispatchDelay(user.timezone);

        // 7. Enqueue persistent background job
        // REVIEW RULE: Idempotency parameter is passed as Job ID
        try {
            await emailQueue.add(
                `SendEmail-${eventId}`,
                {
                    to: user.email,
                    subject,
                    html,
                    eventId,
                    recipientId: payload.recipientId,
                    recipientType: payload.recipientType,
                    eventType: payload.eventType,
                    templateVersion: template.version
                },
                {
                    jobId: eventId, // Enforces Redis-level deduplication
                    delay: delayMs
                }
            );

            logger.info({ eventId, delayMs }, `[EVENT_BUS] Successfully enqueued email payload.`);
        } catch (error: any) {
            logger.error({ eventId, error: error.message }, `[EVENT_BUS] Failed to enqueue email job.`);
        }
    } catch (error: any) {
        logger.error({ error: error.message, eventType: payload.eventType }, `[EVENT_BUS] Critical dispatch failure.`);
    }
}
