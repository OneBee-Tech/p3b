import { prisma } from "../prisma";
import { getChildImpactSummary } from "../impactNarrativeEngine";
import { dispatchEmailEvent } from "../email/emailEventBus";

/**
 * Event map for the Background Queue
 */
type QueueEvent =
    | { type: "REPORT_VERIFIED", childId: string }
    | { type: "MILESTONE_LOGGED", childId: string, milestoneType: string }
    | { type: "RISK_SCORE_CHANGED", childId: string, oldScore: string, newScore: string };

/**
 * Queue Resilience Strategy: Catch exceptions, retry twice on failure, log structured errors.
 */
export async function dispatchImpactEvent(event: QueueEvent) {
    // Fire and forget strategy (background execution)
    setImmediate(() => {
        processImpactEventWithRetries(event, 2)
            .catch(err => console.error("[ImpactQueue] FATAL Event Failure after retries:", event, err));
    });
}

async function processImpactEventWithRetries(event: QueueEvent, retriesLeft: number) {
    try {
        await handleEvent(event);
    } catch (error) {
        if (retriesLeft > 0) {
            console.warn(`[ImpactQueue] Event failed, retrying... (${retriesLeft} left)`, event, error);
            // Wait 2 seconds before retry
            await new Promise(resolve => setTimeout(resolve, 2000));
            await processImpactEventWithRetries(event, retriesLeft - 1);
        } else {
            throw error; // Let the top-level catch log the fatal error
        }
    }
}

async function handleEvent(event: QueueEvent) {
    console.log(`[ImpactQueue] Processing ${event.type} for child ${event.childId}`);

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
        console.log(`[ImpactQueue] No active sponsors found for child ${child.id}. Skipping email dispatch.`);
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
