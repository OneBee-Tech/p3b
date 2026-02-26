import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import MilestonesClient from "./MilestonesClient";

export default async function MilestonesDashboard() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/admin");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

    if (!user) redirect("/signin");

    const milestones = await prisma.impactMilestone.findMany({
        orderBy: { achievedAt: "desc" },
        include: {
            registryChild: {
                select: {
                    displayName: true,
                }
            }
        }
    });

    const childrenList = await prisma.registryChild.findMany({
        where: { isArchived: false, status: "SPONSORED" },
        select: {
            id: true,
            displayName: true,
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <MilestonesClient milestones={milestones} childrenList={childrenList} currentAdminId={user.id} />
        </div>
    );
}
