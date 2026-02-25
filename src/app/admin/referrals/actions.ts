"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateReferralStatus(id: string, newStatus: any) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const referral = await prisma.referral.update({
        where: { id },
        data: { status: newStatus }
    });

    // Governance: Audit the state shift
    await prisma.adminActionLog.create({
        data: {
            adminId: session.user.id as string,
            actionType: "UPDATE_REFERRAL_STATUS",
            targetEntity: "Referral",
            targetId: referral.id,
            newValue: `Shifted to ${newStatus}`,
        }
    });

    revalidatePath("/admin/referrals");
}

export async function approveAndConvertReferral(id: string) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    await prisma.referral.update({
        where: { id },
        data: { status: "APPROVED" }
    });

    await prisma.adminActionLog.create({
        data: {
            adminId: session.user.id as string,
            actionType: "APPROVE_REFERRAL",
            targetEntity: "Referral",
            targetId: id,
            newValue: "Converted to APPROVED and forwarded to CMS Ingestion",
        }
    });

    redirect(`/admin/children/new?referralId=${id}`);
}

