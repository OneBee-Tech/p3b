import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const children = await prisma.registryChild.findMany({
            where: {
                deletedAt: null,
                isArchived: false
            },
            include: {
                assignments: {
                    where: { status: "ACTIVE" }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Exclude sensitive safeguarding metadata per governance rules
        const csvRows = [
            ["ID", "Name", "Age", "Region", "Education Level", "Monthly Need", "Status", "Privacy Mode", "Active Sponsors", "Max Sponsors", "Added On"]
        ];

        for (const child of children) {
            csvRows.push([
                child.id,
                `"${child.displayName}"`,
                child.age.toString(),
                `"${child.region}"`,
                `"${child.educationLevel}"`,
                child.sponsorshipNeededMonthly.toString(),
                child.status,
                child.privacyMode,
                child.assignments.length.toString(),
                child.maxSponsors.toString(),
                child.createdAt.toISOString()
            ]);
        }

        const csvString = csvRows.map(row => row.join(",")).join("\n");

        // Log the export action
        await prisma.adminActionLog.create({
            data: {
                adminId: session.user.id,
                actionType: "EXPORT_CHILDREN_CSV",
                targetEntity: "RegistryChild",
                targetId: "ALL",
            }
        });

        return new NextResponse(csvString, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="registry_children_export_${new Date().toISOString().split('T')[0]}.csv"`
            }
        });
    } catch (error) {
        console.error("CSV Export Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
