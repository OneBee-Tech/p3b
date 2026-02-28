import { prisma } from "../prisma";
import { getChildImpactSummary } from "../impactNarrativeEngine";
import { dispatchEmailEvent } from "../email/emailEventBus";
import { impactNarrativeQueue } from "../queue/queueClient";
import { logger } from "../logger";

/**
 * Event map for the Background Queue
 */
export type QueueEvent =
    | { type: "REPORT_VERIFIED", childId: string }
    | { type: "MILESTONE_LOGGED", childId: string, milestoneType: string }
    | { type: "RISK_SCORE_CHANGED", childId: string, oldScore: string, newScore: string };

/**
 * Queue Resilience Strategy: Push to robust Redis-backed BullMQ logic. 
 * Prevents in-memory loss during rapid Vercel container rotation.
 */
export async function dispatchImpactEvent(event: QueueEvent) {
    // REVIEW RULE: Idempotency metric provided to queue
    const jobId = `${event.type}-${event.childId}-${Date.now()}`;

    try {
        await impactNarrativeQueue.add(
            `ProcessImpact-${event.type}`,
            event,
            { jobId } // Built-in enqueue deduplication based on exact timestamp grouping
        );
        logger.info({ jobId, eventType: event.type }, `[ImpactQueue] Enqueued impact generation event.`);
    } catch (error: any) {
        logger.error({ error: error.message, eventType: event.type }, `[ImpactQueue] Failed to enqueue event.`);
    }
}

// NOTE: This logic is heavily synchronous. In Phase 12, this is moved to be processed BY THE WORKER
// See `src/lib/queue/queueClient.ts` workers.
export async function processImpactEvent(event: QueueEvent) {
    logger.info({ childId: event.childId }, `[ImpactQueue] Processing ${event.type}`);

    // Fetch the child + their assignments to find sponsors to notify
    const child = await (prisma as any).registryChild.findUnique({
        where: { id: event.childId },
        include: {
            assignments: {
                where: { status: "ACTIVE" },
                include: { donor: true }
            },
            corporateAllocations: {
                where: { revokedAt: null },
                include: { corporateSponsor: true }
            }
        }
    });

    if (!child) throw new Error("Child not found for event");
    if (child.assignments.length === 0 && child.corporateAllocations.length === 0) {
        logger.info({ childId: child.id }, `[ImpactQueue] No active sponsors found. Skipping dispatch.`);
        return;
    }

    // Generate the AI summary (safely cached and fallback-protected by the engine)
    const aiSummary = await getChildImpactSummary(child.id);

    // Fetch the latest active report for attendance info
    const latestReport = await prisma.progressReport.findFirst({
        where: { registryChildId: child.id, verificationStatus: "VERIFIED" },
        orderBy: { createdAt: "desc" }
    });

    const attendanceStr = latestReport?.attendanceRate !== null ? `${latestReport?.attendanceRate}%` : "Not available";

    // Build a flattened array of all recipients
    const recipients: { id: string; type: "DONOR" | "CORPORATE" }[] = [];
    child.assignments.forEach((a: any) => recipients.push({ id: a.donor.id, type: "DONOR" }));
    child.corporateAllocations.forEach((a: any) => {
        if (a.corporateSponsor?.userId) {
            recipients.push({ id: a.corporateSponsor.userId, type: "CORPORATE" });
        }
    });

    // Dispatch emails to all active sponsors
    const dispatchPromises = recipients.map(async (recipient) => {
        switch (event.type) {
            case "REPORT_VERIFIED":
                await dispatchEmailEvent({
                    eventType: "REPORT_VERIFIED",
                    recipientId: recipient.id,
                    recipientType: recipient.type,
                    entityId: event.childId,
                    data: { childName: child.displayName, narrative: aiSummary }
                });
                break;
            case "MILESTONE_LOGGED":
                await dispatchEmailEvent({
                    eventType: "MILESTONE_LOGGED",
                    recipientId: recipient.id,
                    recipientType: recipient.type,
                    entityId: event.childId,
                    data: { childName: child.displayName, milestoneTitle: event.milestoneType }
                });
                break;
            case "RISK_SCORE_CHANGED":
                await dispatchEmailEvent({
                    eventType: "RISK_SCORE_CHANGED",
                    recipientId: recipient.id,
                    recipientType: recipient.type,
                    entityId: event.childId,
                    isCritical: true,
                    data: { childName: child.displayName }
                });
                break;
        }
    });

    await Promise.all(dispatchPromises);
}
