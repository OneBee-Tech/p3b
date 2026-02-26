import prisma from "@/lib/prisma";
import { getFundingGapReport } from "./fundingEngine";

export interface SponsorshipAnalytics {
    cancellationRate: number; // Percentage 0-100
    avgSponsorshipDurationDays: number;
    fundingStabilityIndex: number; // Percentage 0-100 indicating how "stable" the sponsorships are
    graceRecoveryRate: number;
    priorityQueueSize: number;
    criticalChildrenCount: number;
    avgSponsorSlotsFilled: number;
}

/**
 * Calculates high-level aggregate analytics for sponsorship health.
 * NOTE: Designed to NOT track sensitive financial details (sums, transaction amounts).
 * Purely structural lifecycle analytics.
 */
export async function generateSponsorshipAnalytics(): Promise<SponsorshipAnalytics> {
    // 1. Sponsorship Cancellation Rate (Churn Rate)
    // Formula: (Cancelled Sponsorships / Total Ever Active Sponsorships) * 100
    const allAssignments = await prisma.sponsorshipAssignment.findMany({
        select: {
            status: true,
            startedAt: true,
            endedAt: true
        }
    });

    const totalEverActive = allAssignments.length;
    const totalEnded = allAssignments.filter(a => a.status === "ENDED" || a.status === "PAUSED").length;

    const cancellationRate = totalEverActive === 0 ? 0 : (totalEnded / totalEverActive) * 100;

    // 2. Average Sponsorship Duration
    // Calculate for ended sponsorships, or use (now - start) for active ones
    let totalDurationDays = 0;
    allAssignments.forEach(a => {
        const end = a.endedAt ? new Date(a.endedAt) : new Date();
        const start = new Date(a.startedAt);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalDurationDays += diffDays;
    });

    const avgSponsorshipDurationDays = totalEverActive === 0 ? 0 : totalDurationDays / totalEverActive;

    // 3. Funding Stability Index
    // Formula: (Total Fully Sponsored Slots / Total Needed Slots across active children) * 100
    // Modified by recent Payment Failures (penalty)
    const gapReport = await getFundingGapReport();

    const activeChildren = gapReport.all;
    let totalNeededSlots = 0;
    let totalFilledSlots = 0;

    activeChildren.forEach(child => {
        totalNeededSlots += child.maxSponsors;
        totalFilledSlots += child.activeSponsors;
    });

    let baseStability = totalNeededSlots === 0 ? 100 : (totalFilledSlots / totalNeededSlots) * 100;

    // Apply a penalty to stability for recent AT_RISK or PAYMENT_FAILED health logs
    const recentFails = await prisma.sponsorshipHealthLog.count({
        where: {
            healthStatus: { in: ["PAYMENT_FAILED", "AT_RISK"] },
            createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
    });

    // 1% penalty per active failure log in the last 30 days, capped at 20%
    const penalty = Math.min(20, recentFails * 1);
    const fundingStabilityIndex = Math.max(0, baseStability - penalty);

    const priorityQueueSize = await prisma.sponsorshipPriorityQueue.count({ where: { resolvedAt: null } });

    const avgSponsorSlotsFilled = activeChildren.length === 0 ? 0 : parseFloat((totalFilledSlots / activeChildren.length).toFixed(1));

    const criticalChildrenCount = gapReport.critical.length;

    // Grace Recovery Rate (Placeholder until successful payment webhooks log HEALTHY)
    const graceRecoveryRate = 0;

    return {
        cancellationRate: parseFloat(cancellationRate.toFixed(2)),
        avgSponsorshipDurationDays: Math.round(avgSponsorshipDurationDays),
        fundingStabilityIndex: parseFloat(fundingStabilityIndex.toFixed(2)),
        graceRecoveryRate,
        priorityQueueSize,
        criticalChildrenCount,
        avgSponsorSlotsFilled
    };
}
