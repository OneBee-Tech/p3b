"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Verification check for admin access
async function verifyAdmin() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session.user;
}

// -------------------------------------------------------------
// GET SPONSORS
// -------------------------------------------------------------
export async function getCorporateSponsors() {
    await verifyAdmin();

    return await prisma.corporateSponsor.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { allocations: true },
            },
        },
    });
}

export async function getCorporateSponsorById(id: string) {
    await verifyAdmin();

    return await prisma.corporateSponsor.findUnique({
        where: { id },
        include: {
            allocations: {
                include: {
                    registryChild: true,
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });
}

// -------------------------------------------------------------
// CREATE / EDIT SPONSORS
// -------------------------------------------------------------

type CreateSponsorInput = {
    organizationName: string;
    contactPersonName: string;
    contactEmail: string;
    contactPhone?: string;
    headquartersCountry: string;
    fundingModel: "SLOT_BASED" | "POOL_BASED";
    sponsorshipCapacity: number;
    contractStartDate: Date;
    contractEndDate?: Date | null;
    status: "ACTIVE" | "PAUSED" | "ENDED";
};

export async function createCorporateSponsor(data: CreateSponsorInput) {
    const admin = await verifyAdmin();

    try {
        const sponsor = await prisma.corporateSponsor.create({
            data: {
                ...data,
            },
        });

        // Audit Logging
        await prisma.adminActionLog.create({
            data: {
                adminId: admin.id!,
                actionType: "CREATE",
                targetEntity: "CorporateSponsor",
                targetId: sponsor.id,
                newValue: JSON.stringify({ organizationName: sponsor.organizationName, capacity: sponsor.sponsorshipCapacity }),
            },
        });

        revalidatePath("/admin/corporate");
        return { success: true, sponsor };
    } catch (error: any) {
        console.error("Error creating corporate sponsor:", error);
        return { success: false, error: "Failed to create sponsor." };
    }
}

export async function updateCorporateSponsor(id: string, data: Partial<CreateSponsorInput>) {
    const admin = await verifyAdmin();

    try {
        const oldSponsor = await prisma.corporateSponsor.findUnique({ where: { id } });

        const sponsor = await prisma.corporateSponsor.update({
            where: { id },
            data,
        });

        // Audit Logging
        await prisma.adminActionLog.create({
            data: {
                adminId: admin.id!,
                actionType: "UPDATE",
                targetEntity: "CorporateSponsor",
                targetId: sponsor.id,
                previousValue: JSON.stringify(oldSponsor),
                newValue: JSON.stringify(sponsor),
            },
        });

        revalidatePath(`/admin/corporate`);
        revalidatePath(`/admin/corporate/${id}`);
        return { success: true, sponsor };
    } catch (error: any) {
        console.error("Error updating corporate sponsor:", error);
        return { success: false, error: "Failed to update sponsor." };
    }
}
