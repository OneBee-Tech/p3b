import prisma from "@/lib/prisma";

export type RetentionClassification = "HEALTHY" | "COOLING" | "AT_RISK" | "CHURNED";

export interface RetentionMetrics {
    sponsorTenureDays: number;
    lastDashboardVisit: Date | null;
    lastEmailOpened: Date | null; // Simulating email open tracking 
    classification: RetentionClassification;
}

/**
 * Calculates sponsor retention signals dynamically to prevent state drift.
 * Never persists the classification to the database.
 */
export async function calculateRetentionSignals(donorId: string): Promise<RetentionMetrics> {
    const donor = await prisma.user.findUnique({
        where: { id: donorId },
        include: {
            sponsorshipAssignments: {
                where: { status: { in: ["ACTIVE", "PAUSED"] } },
                orderBy: { startedAt: "asc" }
            }
        }
    });

    if (!donor) throw new Error("Donor not found");

    const now = new Date();

    // Tenure
    const firstAssignment = donor.sponsorshipAssignments[0];
    const sponsorTenureDays = firstAssignment
        ? Math.floor((now.getTime() - firstAssignment.startedAt.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    // Simulate engagement metrics (In a real app these would be tracked via analytics events)
    // We'll use the last login/session time as a proxy for dashboard visit if available.
    // For this demonstration architecture, we'll default to the updated limit.
    const lastDashboardVisit = donor.updatedAt;
    const lastEmailOpened = donor.updatedAt; // Proxy

    // Classify
    let classification: RetentionClassification = "HEALTHY";

    if (donor.sponsorshipAssignments.length === 0) {
        classification = "CHURNED";
    } else {
        const daysSinceVisit = Math.floor((now.getTime() - lastDashboardVisit.getTime()) / (1000 * 60 * 60 * 24));

        // Is any active assignment failing?
        // Note: Project3B relies on the SponsorshipHealthLog to flag AT_RISK failing payments,
        // but for dynamic checking we can also look at the active list.

        if (daysSinceVisit > 45) {
            classification = "COOLING";
            // If we had payment failure data attached directly to the assignment, we would escalate to AT_RISK here.
        }
    }

    return {
        sponsorTenureDays,
        lastDashboardVisit,
        lastEmailOpened,
        classification
    };
}
