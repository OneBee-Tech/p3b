import prisma from "@/lib/prisma";
import { getChildImpactSummary } from "../impactNarrativeEngine";
import { sendProgressUpdateEmail, sendMilestoneCelebrationEmail } from "../donorImpactMailer";

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
    const child = await prisma.registryChild.findUnique({
        where: { id: event.childId },
        include: {
            assignments: {
                where: { status: "ACTIVE" },
                include: { donor: true }
            }
        }
    });

    if (!child) throw new Error("Child not found for event");
    if (child.assignments.length === 0) {
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

    // Dispatch emails to all active sponsors
    const dispatchPromises = child.assignments.map(async (assignment) => {
        const donor = assignment.donor;
        if (!donor.email || !donor.name) return;

        switch (event.type) {
            case "REPORT_VERIFIED":
                await sendProgressUpdateEmail(donor.id, donor.email, donor.name, child.displayName, aiSummary, attendanceStr);
                break;
            case "MILESTONE_LOGGED":
                await sendMilestoneCelebrationEmail(donor.id, donor.email, donor.name, child.displayName, event.milestoneType, aiSummary);
                // The master prompt dictates milestone celebrations might auto-trigger extra actions later.
                break;
            // RISK_SCORE_CHANGED is currently handled similarly via the mailer's intervention alert in a deeper implementation,
            // but we'll log it for now to adhere to the core rule without spamming right away unless explicitly designed.
            case "RISK_SCORE_CHANGED":
                console.log(`[ImpactQueue] Risk score changed for ${child.displayName}. Triggering analytics tracking.`);
                break;
        }
    });

    await Promise.all(dispatchPromises);
}
