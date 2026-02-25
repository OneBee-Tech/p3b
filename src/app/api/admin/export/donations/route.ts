import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const donations = await prisma.donation.findMany({
            include: {
                user: { select: { email: true, name: true } },
                program: { select: { name: true } },
            },
            orderBy: { createdAt: 'desc' }
        });

        const csvRows = [
            ["Donation ID", "Date", "Donor Name", "Donor Email", "Amount (USD)", "Type", "Status", "Allocation Status", "Program/Community"]
        ];

        for (const d of donations) {
            csvRows.push([
                d.id,
                d.createdAt.toISOString(),
                `"${d.user?.name || 'Anonymous'}"`,
                `"${d.user?.email || 'N/A'}"`,
                (Number(d.amount) / 100).toFixed(2),
                d.type,
                d.status,
                d.allocationStatus,
                `"${d.program?.name || 'Unrestricted General Fund'}"`
            ]);
        }

        const csvString = csvRows.map(row => row.join(",")).join("\n");

        // Log the export action (Governance: Immutable Snapshot Exported)
        await prisma.adminActionLog.create({
            data: {
                adminId: session.user.id as string,
                actionType: "EXPORT_DONATIONS_CSV",
                targetEntity: "DonationLedger",
                targetId: "ALL",
                newValue: "Generated read-only financial snapshot",
            }
        });

        return new NextResponse(csvString, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="donation_ledger_export_${new Date().toISOString().split('T')[0]}.csv"`
            }
        });
    } catch (error) {
        console.error("Donation CSV Export Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
