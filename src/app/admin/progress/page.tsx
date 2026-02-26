import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import ProgressClient from "./ProgressClient";

export default async function ProgressDashboard() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/admin");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

    if (!user) redirect("/signin");

    const reports = await prisma.progressReport.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            registryChild: {
                select: {
                    displayName: true,
                    region: true
                }
            }
        }
    });

    const childrenList = await prisma.registryChild.findMany({
        where: { isArchived: false, status: "SPONSORED" }, // Only reporting on sponsored kids
        select: {
            id: true,
            displayName: true,
            region: true
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProgressClient reports={reports} childrenList={childrenList} currentAdminId={user.id} />
        </div>
    );
}
