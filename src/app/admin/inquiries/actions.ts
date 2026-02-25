"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session.user;
}

export async function updateInquiryStatus(inquiryId: string, newStatus: "IN_PROGRESS" | "RESOLVED") {
    const user = await requireAdmin();

    const existing = await prisma.contactInquiry.findUnique({
        where: { id: inquiryId, deletedAt: null, isArchived: false },
        select: { status: true },
    });
    if (!existing) throw new Error("Inquiry not found");

    await prisma.contactInquiry.update({
        where: { id: inquiryId },
        data: { status: newStatus },
    });

    await prisma.adminActionLog.create({
        data: {
            adminId: (user as any).id,
            actionType: "UPDATE_INQUIRY_STATUS",
            targetEntity: "ContactInquiry",
            targetId: inquiryId,
            previousValue: existing.status,
            newValue: newStatus,
        },
    });

    revalidatePath("/admin/inquiries");
}

export async function archiveInquiry(inquiryId: string) {
    const user = await requireAdmin();

    await prisma.contactInquiry.update({
        where: { id: inquiryId },
        data: { isArchived: true, status: "ARCHIVED" },
    });

    await prisma.adminActionLog.create({
        data: {
            adminId: (user as any).id,
            actionType: "ARCHIVE_INQUIRY",
            targetEntity: "ContactInquiry",
            targetId: inquiryId,
            previousValue: "active",
            newValue: "archived",
        },
    });

    revalidatePath("/admin/inquiries");
}

export async function softDeleteInquiry(inquiryId: string) {
    const user = await requireAdmin();

    await prisma.contactInquiry.update({
        where: { id: inquiryId },
        data: { deletedAt: new Date() },
    });

    await prisma.adminActionLog.create({
        data: {
            adminId: (user as any).id,
            actionType: "SOFT_DELETE_INQUIRY",
            targetEntity: "ContactInquiry",
            targetId: inquiryId,
            previousValue: "visible",
            newValue: "deleted",
        },
    });

    revalidatePath("/admin/inquiries");
}
