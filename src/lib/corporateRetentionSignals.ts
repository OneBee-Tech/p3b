// src/lib/corporateRetentionSignals.ts
import { prisma } from "./prisma";

/**
 * PHASE 9.7 - CORPORATE RETENTION SIGNALS
 * Separate from individual donor retention logic, this tracks Corporate specific
 * engagement metrics like contract duration, renewal windows, and fulfillment.
 */

export async function checkCorporateRenewalReadiness(sponsorId: string) {
    const sponsor = await (prisma as any).corporateSponsor.findUnique({
        where: { id: sponsorId },
        include: { allocations: { where: { revokedAt: null } } }
    });

    if (!sponsor || !sponsor.contractEndDate) return null;

    const daysUntilExpiry = Math.ceil((sponsor.contractEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    // Fulfillment velocity
    const fulfillmentRate = sponsor.sponsorshipCapacity > 0
        ? sponsor.allocations.length / sponsor.sponsorshipCapacity
        : 0;

    const renewalWindow = daysUntilExpiry <= 90; // 90-day renewal cycle for enterprise

    return {
        sponsorId,
        daysUntilExpiry,
        renewalWindowOpen: renewalWindow,
        fulfillmentRate, // e.g. 0.8 = 80% capacity filled
        healthScore: calculateHealthScore(fulfillmentRate, daysUntilExpiry)
    };
}

function calculateHealthScore(fulfillmentRate: number, daysToExpiry: number) {
    let score = 100;
    if (fulfillmentRate < 0.5) score -= 30; // Poor utilization
    if (daysToExpiry < 30 && fulfillmentRate < 0.8) score -= 20; // Expiring soon, not fully engaged
    return score;
}
