"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session.user as any;
}

export async function updateInquiryStatus(inquiryId: string, newStatus: "IN_PROGRESS" | "RESOLVED") {
    const user = await requireAdmin();

    // Get previous status for audit log
    const rows = await prisma.$queryRaw<{ status: string }[]>`
        SELECT status FROM "ContactInquiry" WHERE id = ${inquiryId} AND "deletedAt" IS NULL AND "isArchived" = false
    `;
    if (!rows.length) throw new Error("Inquiry not found");
    const previousStatus = rows[0].status;

    await prisma.$executeRaw`
        UPDATE "ContactInquiry"
        SET status = ${newStatus}::"InquiryStatus", "updatedAt" = NOW()
        WHERE id = ${inquiryId}
    `;

    await prisma.$executeRaw`
        INSERT INTO "AdminActionLog" (id, "adminId", "actionType", "targetEntity", "targetId", "previousValue", "newValue", timestamp)
        VALUES (gen_random_uuid()::text, ${user.id}, 'UPDATE_INQUIRY_STATUS', 'ContactInquiry', ${inquiryId}, ${previousStatus}, ${newStatus})
    `;

    revalidatePath("/admin/inquiries");
}

export async function archiveInquiry(inquiryId: string) {
    const user = await requireAdmin();

    await prisma.$executeRaw`
        UPDATE "ContactInquiry"
        SET "isArchived" = true, status = 'ARCHIVED'::"InquiryStatus", "updatedAt" = NOW()
        WHERE id = ${inquiryId}
    `;

    await prisma.$executeRaw`
        INSERT INTO "AdminActionLog" (id, "adminId", "actionType", "targetEntity", "targetId", "previousValue", "newValue", timestamp)
        VALUES (gen_random_uuid()::text, ${user.id}, 'ARCHIVE_INQUIRY', 'ContactInquiry', ${inquiryId}, 'active', 'archived')
    `;

    revalidatePath("/admin/inquiries");
}

export async function softDeleteInquiry(inquiryId: string) {
    const user = await requireAdmin();

    await prisma.$executeRaw`
        UPDATE "ContactInquiry"
        SET "deletedAt" = NOW(), "updatedAt" = NOW()
        WHERE id = ${inquiryId}
    `;

    await prisma.$executeRaw`
        INSERT INTO "AdminActionLog" (id, "adminId", "actionType", "targetEntity", "targetId", "previousValue", "newValue", timestamp)
        VALUES (gen_random_uuid()::text, ${user.id}, 'SOFT_DELETE_INQUIRY', 'ContactInquiry', ${inquiryId}, 'visible', 'deleted')
    `;

    revalidatePath("/admin/inquiries");
}
