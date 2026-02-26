import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export type FundingStatus = "STABLE" | "AT_RISK" | "HIGH_RISK" | "CRITICAL";

export interface ChildFundingSummary {
    childId: string;
    name: string;
    region: string;
    activeSponsors: number;
    maxSponsors: number;
    remainingSlots: number;
    status: FundingStatus;
    fullySponsored: boolean;
    gracePeriodSponsors: number;
}

/**
 * Funding Stability Logic is derived operational intelligence.
 * No financial ledger mutations occur within this system.
 * All classifications are observational and reversible.
 */

const GRACE_PERIOD_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export const calculateFundingStatus = unstable_cache(
    async (childId: string): Promise<ChildFundingSummary> => {
        const child = await prisma.registryChild.findUnique({
            where: { id: childId },
            include: {
                assignments: {
                    where: { status: "ACTIVE" }
                }
            }
        });

        if (!child) throw new Error("RegistryChild not found");

        const activeAssignmentIds = child.assignments.map(a => a.id);
        const logs = await prisma.sponsorshipHealthLog.findMany({
            where: { sponsorshipId: { in: activeAssignmentIds } },
            orderBy: { createdAt: "desc" }
        });

        const now = new Date().getTime();
        let validActiveCount = 0;
        let gracePeriodCount = 0;

        for (const a of child.assignments) {
            const latestLog = logs.find(l => l.sponsorshipId === a.id);
            if (latestLog && latestLog.healthStatus === "PAYMENT_FAILED") {
                const timeSince = now - new Date(latestLog.createdAt).getTime();
                if (timeSince > GRACE_PERIOD_MS) {
                    continue; // Grace period expired, doesn't count as active slot
                } else {
                    gracePeriodCount++;
                }
            }
            validActiveCount++;
        }

        const activeSponsors = validActiveCount;
        const remainingSlots = Math.max(0, child.maxSponsors - activeSponsors);
        const fundingRatio = child.maxSponsors > 0 ? activeSponsors / child.maxSponsors : 1;

        let status: FundingStatus = "STABLE";
        if (fundingRatio === 0) status = "CRITICAL";
        else if (fundingRatio < 0.5) status = "HIGH_RISK";
        else if (fundingRatio < 1) status = "AT_RISK";

        return {
            childId: child.id,
            name: child.displayName,
            region: child.region,
            activeSponsors,
            maxSponsors: child.maxSponsors,
            remainingSlots,
            status,
            fullySponsored: remainingSlots === 0,
            gracePeriodSponsors: gracePeriodCount
        };
    },
    ["calculate-funding-status"],
    { revalidate: 900, tags: ["funding-engine"] }
);

export const getFundingGapReport = unstable_cache(
    async () => {
        const activeChildren = await prisma.registryChild.findMany({
            where: {
                deletedAt: null,
                isArchived: false,
                status: { in: ["WAITING", "SPONSORED"] }
            },
            include: {
                assignments: {
                    where: { status: "ACTIVE" },
                    include: { donor: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        const activeAssignmentIds = activeChildren.flatMap(c => c.assignments.map(a => a.id));
        const logs = await prisma.sponsorshipHealthLog.findMany({
            where: { sponsorshipId: { in: activeAssignmentIds } },
            orderBy: { createdAt: "desc" }
        });

        const now = new Date().getTime();
        const gracePeriodDetails: any[] = []; // Collect active grace period sponsors for Admin Dashboard

        const report: ChildFundingSummary[] = activeChildren.map(child => {
            let validActiveCount = 0;
            let gracePeriodCount = 0;

            for (const a of child.assignments) {
                const latestLog = logs.find(l => l.sponsorshipId === a.id);
                if (latestLog && latestLog.healthStatus === "PAYMENT_FAILED") {
                    const timeSince = now - new Date(latestLog.createdAt).getTime();
                    if (timeSince > GRACE_PERIOD_MS) {
                        continue;
                    } else {
                        gracePeriodCount++;
                        gracePeriodDetails.push({
                            sponsorshipId: a.id,
                            donorName: a.donor.name || "Unknown Donor",
                            childName: child.displayName,
                            graceUntil: new Date(new Date(latestLog.createdAt).getTime() + GRACE_PERIOD_MS)
                        });
                    }
                }
                validActiveCount++;
            }

            const activeSponsors = validActiveCount;
            const remainingSlots = Math.max(0, child.maxSponsors - activeSponsors);
            const fundingRatio = child.maxSponsors > 0 ? activeSponsors / child.maxSponsors : 1;

            let status: FundingStatus = "STABLE";
            if (fundingRatio === 0) status = "CRITICAL";
            else if (fundingRatio < 0.5) status = "HIGH_RISK";
            else if (fundingRatio < 1) status = "AT_RISK";

            return {
                childId: child.id,
                name: child.displayName,
                region: child.region,
                activeSponsors,
                maxSponsors: child.maxSponsors,
                remainingSlots,
                status,
                fullySponsored: remainingSlots === 0,
                gracePeriodSponsors: gracePeriodCount
            };
        });

        return {
            critical: report.filter(r => r.status === "CRITICAL"),
            highRisk: report.filter(r => r.status === "HIGH_RISK"),
            atRisk: report.filter(r => r.status === "AT_RISK"),
            stable: report.filter(r => r.status === "STABLE"),
            all: report,
            totalGapCount: report.reduce((sum, r) => sum + r.remainingSlots, 0),
            gracePeriodDetails
        };
    },
    ["funding-gap-report"],
    { revalidate: 900, tags: ["funding-engine"] }
);
