import { prisma } from "./prisma";
import { dispatchEmailEvent } from "./email/emailEventBus";

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

    const renewalWindowOpen = daysUntilExpiry <= 90; // 90-day renewal cycle for enterprise

    // Phase 10 Integration: Dispatch automated alerts if triggered appropriately
    if (daysUntilExpiry === 60) {
        await dispatchEmailEvent({
            eventType: "CONTRACT_EXPIRY_WARNING",
            recipientId: sponsor.userId!,
            recipientType: "CORPORATE",
            entityId: sponsor.id,
            isCritical: true, // Warnings are flagged as critical
            data: { organizationName: sponsor.organizationName }
        });
    } else if (daysUntilExpiry === 90) {
        await dispatchEmailEvent({
            eventType: "CORPORATE_RENEWAL_WINDOW",
            recipientId: sponsor.userId!,
            recipientType: "CORPORATE",
            entityId: sponsor.id,
            data: { organizationName: sponsor.organizationName }
        });
    }

    return {
        sponsorId,
        daysUntilExpiry,
        renewalWindowOpen,
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
