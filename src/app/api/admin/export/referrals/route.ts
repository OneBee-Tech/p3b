import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const referrals = await prisma.referral.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const csvRows = [
            ["Referral ID", "Date Submitted", "Referrer Name", "Referrer Email", "Child Location", "Education Status", "Urgency", "Notes", "Status"]
        ];

        for (const ref of referrals) {
            // Strip newlines from notes to avoid breaking CSV format
            const cleanNotes = ref.notes ? ref.notes.replace(/\n/g, ' ') : '';

            csvRows.push([
                ref.id,
                ref.createdAt.toISOString(),
                `"${ref.referrerName}"`,
                `"${ref.email}"`,
                `"${ref.childLocation}"`,
                `"${ref.educationStatus}"`,
                ref.urgencyLevel,
                `"${cleanNotes}"`,
                ref.status
            ]);
        }

        const csvString = csvRows.map(row => row.join(",")).join("\n");

        // Log the export action
        await prisma.adminActionLog.create({
            data: {
                adminId: session.user.id,
                actionType: "EXPORT_REFERRALS_CSV",
                targetEntity: "ReferralPipeline",
                targetId: "ALL",
                newValue: "Generated read-only referral snapshot",
            }
        });

        return new NextResponse(csvString, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="referrals_export_${new Date().toISOString().split('T')[0]}.csv"`
            }
        });
    } catch (error) {
        console.error("Referral CSV Export Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
