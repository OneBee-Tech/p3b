import { prisma } from "@/lib/prisma";
import { User } from "next-auth";

/**
 * PHASE 9 - CORPORATE ALLOCATION ENGINE
 * Validates available sponsorship capacity across individual and corporate sponsors.
 * Maps RegistryChildren to CorporateSponsors without mutating Donation ledgers.
 */
export async function allocateChildrenToCorporateSponsor(sponsorId: string, admin: User) {
    // 1. Fetch Corporate Sponsor and their current allocations
    const sponsor = await prisma.corporateSponsor.findUnique({
        where: { id: sponsorId },
        include: {
            allocations: true,
        },
    });

    if (!sponsor) throw new Error("Corporate Sponsor not found.");
    if (sponsor.status !== "ACTIVE") throw new Error("Cannot allocate children to inactive sponsors.");

    const currentFilledSlots = sponsor.allocations.filter(a => !a.revokedAt).length;
    const remainingCapacity = sponsor.sponsorshipCapacity - currentFilledSlots;

    if (remainingCapacity <= 0) {
        return { success: false, error: "Sponsor has reached maximum capacity." };
    }

    // 2. Identify eligible children based on Co-Funding Governance Rule
    // totalCorporateSlots + totalIndividualSlots < maxSponsors

    // Fetch all children not fully sponsored, prioritized by deepest funding gap / WAITING status
    const eligibleChildrenRaw = await prisma.registryChild.findMany({
        where: {
            status: { in: ["WAITING", "PARTIALLY_FUNDED"] as any },
            isArchived: false,
            deletedAt: null,
        },
        include: {
            assignments: { where: { status: "ACTIVE" } } as any,
            corporateAllocations: { where: { revokedAt: null } }
        },
        orderBy: [
            { status: "asc" }, // WAITING first
            { age: "asc" }     // Then youngest
        ]
    });

    // 3. Filter strictly by Co-Funding Rule mapping capacity limits
    const eligibleChildren = eligibleChildrenRaw.filter(child => {
        // Prevent double mapping to the same corporate sponsor
        const alreadyAllocated = (child as any).corporateAllocations.some((a: any) => a.corporateSponsorId === sponsorId);
        if (alreadyAllocated) return false;

        const totalIndividualSlots = (child as any).assignments.length;
        const totalCorporateSlots = (child as any).corporateAllocations.reduce((acc: any, curr: any) => acc + curr.allocatedSlots, 0);

        return (totalIndividualSlots + totalCorporateSlots) < child.maxSponsors;
    });

    if (eligibleChildren.length === 0) {
        return { success: false, error: "No eligible children available for allocation under current capacity rules." };
    }

    // 4. Determine how many to allocate this batch
    const allocationCount = Math.min(remainingCapacity, eligibleChildren.length);
    const childrenToAllocate = eligibleChildren.slice(0, allocationCount);

    const newAllocations = [];

    // 5. Execute Relational Mapping (Strictly Isolated from Donation/Stripe tables)
    for (const child of childrenToAllocate) {
        const allocation = await prisma.corporateSponsorshipAllocation.create({
            data: {
                corporateSponsorId: sponsorId,
                registryChildId: child.id,
                allocatedSlots: 1, // Standardizing to 1 slot per child per sponsor for mapping
                filledSlots: 1,
                allocationStatus: "FULLY_ALLOCATED"
            }
        });
        newAllocations.push(allocation);

        // Update child status to PARTIALLY_FUNDED if they were waiting 
        // We do NOT mark them fully funded here because funding logic stays purely in the Donation webhook tier.
        if (child.status === "WAITING") {
            await prisma.registryChild.update({
                where: { id: child.id },
                data: { status: "PARTIALLY_FUNDED" as any }
            });
        }
    }

    // 6. Audit Logging Required by Governance
    await prisma.adminActionLog.create({
        data: {
            adminId: admin.id!,
            actionType: "BULK_ALLOCATE",
            targetEntity: "CorporateSponsor",
            targetId: sponsorId,
            newValue: JSON.stringify({
                allocatedCount: newAllocations.length,
                childIds: newAllocations.map(a => a.registryChildId)
            }),
        }
    });

    return {
        success: true,
        allocatedCount: newAllocations.length,
        allocations: newAllocations
    };
}

/**
 * Handle Reversal Governance for a specific allocation
 */
export async function revokeCorporateAllocation(allocationId: string, reason: string, admin: User) {
    const allocation = await prisma.corporateSponsorshipAllocation.update({
        where: { id: allocationId },
        data: {
            revokedAt: new Date(),
            revokedReason: reason,
            allocationStatus: "OPEN"
        }
    });

    // Audit Logging
    await prisma.adminActionLog.create({
        data: {
            adminId: admin.id!,
            actionType: "REVOKE_ALLOCATION",
            targetEntity: "CorporateSponsorshipAllocation",
            targetId: allocationId,
            newValue: JSON.stringify({ reason }),
        }
    });

    return { success: true, allocation };
}
