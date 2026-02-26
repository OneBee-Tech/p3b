import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getFundingGapReport } from "@/lib/fundingEngine";
import SponsorshipHealthClient from "./SponsorshipHealthClient";

export const dynamic = "force-dynamic";

export default async function SponsorshipHealthPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") redirect("/");

    // 1. Fetch aggregated funding gap data via our new Engine
    const fundingReport = await getFundingGapReport();

    // 2. Fetch churn risks (Active sponsorships tied to Stripe subs that might be past due, though we handle past_due via webhooks. 
    // For the dashboard, we'll look at the recently logged Health issues)
    const recentHealthLogs = await prisma.sponsorshipHealthLog.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
        orderBy: { createdAt: "desc" },
        take: 50
    });

    // 3. Count total active vs total assignments for high level metrics
    const totalActive = await prisma.sponsorshipAssignment.count({
        where: { status: "ACTIVE" }
    });

    const atRiskCount = recentHealthLogs.filter((log: any) => log.healthStatus === "PAYMENT_FAILED" || log.healthStatus === "AT_RISK").length;
    const churnCount = recentHealthLogs.filter((log: any) => log.healthStatus === "ENDED").length;

    // 4. Priority Queue
    const priorityQueue = await prisma.sponsorshipPriorityQueue.findMany({
        where: { resolvedAt: null },
        orderBy: [{ priorityLevel: 'asc' }, { createdAt: 'asc' }]
    });

    const queuedChildIds = priorityQueue.map((q: any) => q.registryChildId);
    const queuedChildren = await prisma.registryChild.findMany({
        where: { id: { in: queuedChildIds } },
        select: { id: true, displayName: true }
    });

    const enrichedQueue = priorityQueue.map((q: any) => ({
        ...q,
        childName: queuedChildren.find(c => c.id === q.registryChildId)?.displayName || 'Unknown Child'
    }));

    return (
        <SponsorshipHealthClient
            report={fundingReport}
            recentLogs={recentHealthLogs}
            priorityQueue={enrichedQueue}
            metrics={{ totalActive, atRiskCount, churnCount, childrenNeedingSponsors: fundingReport.totalGapCount }}
        />
    );
}
