"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { dispatchImpactEvent } from "@/lib/queues/impactQueue";

export async function createProgressReport(formData: FormData) {

    const registryChildId = formData.get("registryChildId") as string;
    const reportingPeriod = formData.get("reportingPeriod") as string;
    const academicPerformance = formData.get("academicPerformance") as string;
    const attendanceRate = formData.get("attendanceRate") ? parseFloat(formData.get("attendanceRate") as string) : null;
    const teacherFeedback = formData.get("teacherFeedback") as string;
    const wellbeingNotes = formData.get("wellbeingNotes") as string;
    const reportDocumentUrl = formData.get("reportDocumentUrl") as string;
    const guardianConsentConfirmed = formData.get("guardianConsentConfirmed") === "on";
    const consentDocumentUrl = formData.get("consentDocumentUrl") as string;
    const publishAtStr = formData.get("publishAt") as string;
    const createdByAdminId = formData.get("adminId") as string;

    if (!registryChildId || !reportingPeriod || !academicPerformance || !createdByAdminId) {
        throw new Error("Missing required fields");
    }

    // Derived Risk Scoring 
    let riskScore: string = "STABLE";
    if (attendanceRate !== null) {
        if (attendanceRate < 70) riskScore = "INTERVENTION_REQUIRED";
        else if (attendanceRate < 85) riskScore = "MONITOR";
    }

    const publishAt = publishAtStr ? new Date(publishAtStr) : null;

    await prisma.progressReport.create({
        data: {
            registryChildId,
            reportingPeriod,
            academicPerformance,
            attendanceRate,
            teacherFeedback,
            wellbeingNotes,
            reportDocumentUrl,
            guardianConsentConfirmed,
            consentDocumentUrl,
            publishAt,
            riskScore: riskScore as any,
            createdByAdminId,
            verificationStatus: "PENDING", // Always starts pending
        },
    });

    revalidatePath("/admin/progress");
    revalidatePath(`/programs/${registryChildId}`);
    revalidatePath("/dashboard");
}

export async function verifyProgressReport(reportId: string, verifiedByAdminId: string, status: string) {

    const report = await prisma.progressReport.update({
        where: { id: reportId },
        data: {
            verificationStatus: status as any,
            verifiedByAdminId,
            verifiedAt: status === "VERIFIED" ? new Date() : null
        },
    });

    revalidatePath("/admin/progress");

    if (status === "VERIFIED") {
        // Trigger Email Automation & AI Narrative Regeneration
        await dispatchImpactEvent({
            type: "REPORT_VERIFIED",
            childId: report.registryChildId
        });

        // Trigger Risk Score Change event if applicable
        if (report.riskScore !== "STABLE") {
            await dispatchImpactEvent({
                type: "RISK_SCORE_CHANGED",
                childId: report.registryChildId,
                oldScore: "STABLE", // Simplified abstraction
                newScore: report.riskScore
            });
        }
    }
}
