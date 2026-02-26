"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { dispatchImpactEvent } from "@/lib/queues/impactQueue";

export async function createImpactMilestone(formData: FormData) {

    const registryChildId = formData.get("registryChildId") as string;
    const milestoneTypeStr = formData.get("milestoneType") as string;
    const description = formData.get("description") as string;
    const achievedAtStr = formData.get("achievedAt") as string;
    const createdByAdminId = formData.get("adminId") as string;

    if (!registryChildId || !milestoneTypeStr || !description || !achievedAtStr || !createdByAdminId) {
        throw new Error("Missing required fields");
    }

    const achievedAt = new Date(achievedAtStr);

    await prisma.impactMilestone.create({
        data: {
            registryChildId,
            milestoneType: milestoneTypeStr as any,
            description,
            achievedAt,
            createdByAdminId
        }
    });

    // Trigger Email Automation & AI Narrative Regeneration
    await dispatchImpactEvent({
        type: "MILESTONE_LOGGED",
        childId: registryChildId,
        milestoneType: milestoneTypeStr
    });

    revalidatePath("/admin/milestones");
    revalidatePath(`/programs/${registryChildId}`);
    revalidatePath("/dashboard");
}
