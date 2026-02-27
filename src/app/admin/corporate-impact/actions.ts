"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Verification check for admin access
async function verifyAdmin() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session.user;
}

export async function getCSRDashboardMetrics() {
    await verifyAdmin();

    // 1. Total Corporate Capacity vs Filled Slots
    const sponsors = await prisma.corporateSponsor.findMany({
        where: { status: "ACTIVE" },
        include: {
            allocations: {
                where: { revokedAt: null }
            }
        }
    });

    const totalCapacity = sponsors.reduce((acc, curr) => acc + curr.sponsorshipCapacity, 0);
    const filledSlots = sponsors.reduce((acc, curr) => acc + curr.allocations.length, 0);

    // 2. Funding Gap Coverage
    // Compare total needed slots vs total filled slots (Individual + Corporate)
    const allChildren = await prisma.registryChild.findMany({
        where: { isArchived: false, deletedAt: null },
        include: {
            assignments: { where: { status: "ACTIVE" } } as any,
            corporateAllocations: { where: { revokedAt: null } } as any
        }
    });

    let totalNeededSlots = 0;
    let totalCoveredSlots = 0;
    let totalCorporateSlotsUsed = 0;

    allChildren.forEach((child: any) => {
        totalNeededSlots += child.maxSponsors;
        const indSlots = child.assignments?.length || 0;
        const corpSlots = child.corporateAllocations?.length || 0;

        totalCoveredSlots += (indSlots + corpSlots);
        totalCorporateSlotsUsed += corpSlots;
    });

    const coveragePercentage = totalNeededSlots > 0 ? Math.round((totalCoveredSlots / totalNeededSlots) * 100) : 0;
    const corporateSharePercentage = totalCoveredSlots > 0 ? Math.round((totalCorporateSlotsUsed / totalCoveredSlots) * 100) : 0;

    // 3. Graduation Pipeline & 4. Region Heatmap (Manual Aggregation for nested relations safety)
    const pipelineMap = new Map<string, number>();
    const regionMap = new Map<string, number>();

    allChildren.forEach((child: any) => {
        // Only count children who hold at least one active corporate allocation
        if (child.corporateAllocations && child.corporateAllocations.length > 0) {
            const levelCount = pipelineMap.get(child.educationLevel) || 0;
            pipelineMap.set(child.educationLevel, levelCount + 1);

            const regionCount = regionMap.get(child.region) || 0;
            regionMap.set(child.region, regionCount + 1);
        }
    });

    const graduationPipeline = Array.from(pipelineMap.entries())
        .map(([level, count]) => ({ level, count }))
        .sort((a, b) => b.count - a.count);

    const regionHeatmap = Array.from(regionMap.entries())
        .map(([region, count]) => ({ region, count }))
        .sort((a, b) => b.count - a.count);


    return {
        totalCapacity,
        filledSlots,
        coveragePercentage,
        corporateSharePercentage,
        graduationPipeline,
        regionHeatmap,
        totalChildrenLinked: totalCorporateSlotsUsed // Representing total distinct child mappings (since allocating 1 slot per corp per child)
    };
}
