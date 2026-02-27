"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateEmailPreferences(data: {
    receiveImpactUpdates: boolean;
    receiveMilestones: boolean;
    receiveCSRReports: boolean;
}) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await (prisma as any).emailPreferences.upsert({
        where: { userId: session.user.id },
        update: {
            receiveImpactUpdates: data.receiveImpactUpdates,
            receiveMilestones: data.receiveMilestones,
            receiveRiskAlerts: true, // Hard rule: Critical safeguarding alerts cannot be disabled
            receiveCSRReports: data.receiveCSRReports,
        },
        create: {
            userId: session.user.id,
            receiveImpactUpdates: data.receiveImpactUpdates,
            receiveMilestones: data.receiveMilestones,
            receiveRiskAlerts: true,
            receiveCSRReports: data.receiveCSRReports,
        }
    });

    revalidatePath("/settings/notifications");
    return { success: true };
}
