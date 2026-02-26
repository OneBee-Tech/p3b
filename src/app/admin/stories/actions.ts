"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createImpactStory(formData: FormData) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const published = formData.get("published") === "true";

    if (!title || !content) {
        throw new Error("Title and content are required.");
    }

    const story = await prisma.impactStory.create({
        data: {
            title,
            content,
            imageUrl: imageUrl || null,
            published
        }
    });

    // Governance: Log action
    await prisma.adminActionLog.create({
        data: {
            adminId: session.user.id as string,
            actionType: "CREATE_STORY",
            targetEntity: "ImpactStory",
            targetId: story.id,
            newValue: `Created Impact Story: ${title}`,
        }
    });

    revalidatePath("/admin/stories");
    revalidatePath("/impact");
    return { success: true };
}

export async function deleteImpactStory(id: string) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const story = await prisma.impactStory.findUnique({ where: { id } });
    if (!story) throw new Error("Story not found");

    await prisma.impactStory.delete({
        where: { id }
    });

    // Governance: Log action
    await prisma.adminActionLog.create({
        data: {
            adminId: session.user.id as string,
            actionType: "DELETE_STORY",
            targetEntity: "ImpactStory",
            targetId: id,
            previousValue: `Deleted Impact Story: ${story.title}`,
        }
    });

    revalidatePath("/admin/stories");
    revalidatePath("/impact");
    return { success: true };
}
