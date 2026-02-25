"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function submitComplianceDocument(formData: FormData) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const documentUrl = formData.get("documentUrl") as string;
    const versionNumber = formData.get("versionNumber") as string;
    const effectiveDate = formData.get("effectiveDate") as string;
    const expiryDate = formData.get("expiryDate") as string;

    // To avoid schema migration locks, encode metadata cleanly into the URL hash or query
    const urlObj = new URL(documentUrl);
    urlObj.searchParams.set("title", title);
    if (versionNumber) urlObj.searchParams.set("v", versionNumber);
    if (effectiveDate) urlObj.searchParams.set("effective", effectiveDate);
    if (expiryDate) urlObj.searchParams.set("expiry", expiryDate);

    const doc = await prisma.verificationDocument.create({
        data: {
            entityType: "DOCUMENT",
            documentUrl: urlObj.toString(),
            status: "VERIFIED",
            uploadedBy: session.user.id as string,
            reviewedBy: session.user.id as string,
        }
    });

    await prisma.adminActionLog.create({
        data: {
            adminId: session.user.id as string,
            actionType: "UPLOAD_COMPLIANCE_DOC",
            targetEntity: "VerificationDocument",
            targetId: doc.id,
            newValue: `Uploaded ${title} (v${versionNumber || '1.0'})`,
        }
    });

    revalidatePath("/admin/compliance");
    revalidatePath("/impact");
}

export async function archiveComplianceDocument(id: string) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const doc = await prisma.verificationDocument.update({
        where: { id },
        data: { status: "REJECTED" } // Using REJECTED as Archived state to hide from public
    });

    await prisma.adminActionLog.create({
        data: {
            adminId: session.user.id as string,
            actionType: "ARCHIVE_COMPLIANCE_DOC",
            targetEntity: "VerificationDocument",
            targetId: doc.id,
            newValue: `Archived Document`,
        }
    });

    revalidatePath("/admin/compliance");
    revalidatePath("/impact");
}
