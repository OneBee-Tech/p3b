import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, Activity, ShieldAlert } from "lucide-react";
import { calculateRetentionSignals } from "@/lib/retentionSignals";

export default async function ImpactIntelligenceDashboard() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/login");
    }

    // --- High-Risk Students (Recent INTERVENTION_REQUIRED reports) ---
    const highRiskReports = await prisma.progressReport.findMany({
        where: { riskScore: "INTERVENTION_REQUIRED" },
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { registryChild: true }
    });

    // --- Recent Operations Activity (Milestones / Approvals) ---
    const recentMilestones = await prisma.impactMilestone.findMany({
        orderBy: { achievedAt: "desc" },
        take: 5,
        include: { registryChild: true }
    });

    // --- Sponsor Engagement Samples (Proxying the retention signal logic over a few active donors) ---
    // Note: In a true prod reporting environment, this would run as an async materialised view.
    // For this dashboard, we sample 10 recent active donors.
    const sampleDonors = await prisma.user.findMany({
        where: { sponsorships: { some: { status: "ACTIVE" } } },
        take: 10,
        orderBy: { updatedAt: "desc" }
    });

    const donorSignals = await Promise.all(
        sampleDonors.map(async (donor) => {
            const signals = await calculateRetentionSignals(donor.id);
            return {
                name: donor.name || "Unknown Donor",
                email: donor.email,
                classification: signals.classification,
                tenure: signals.sponsorTenureDays
            }
        })
    );

    const coolingOrAtRisk = donorSignals.filter(s => s.classification === "COOLING" || s.classification === "AT_RISK");

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-cinematic-dark mb-2">Impact Intelligence Center</h1>
                    <p className="text-gray-500">Observational tracking for safeguarding interventions and donor retention operations.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. High Risk Children Pipeline */}
                <Card className="border-red-200 shadow-sm">
                    <CardHeader className="bg-red-50/50 border-b border-red-100">
                        <CardTitle className="flex items-center gap-2 text-red-800">
                            <ShieldAlert className="w-5 h-5" /> Active Critical Interventions
                        </CardTitle>
                        <CardDescription>Children flagged with INTERVENTION_REQUIRED in recent progress reports.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {highRiskReports.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No critical interventions flagged recently.</p>
                        ) : (
                            <div className="space-y-4">
                                {highRiskReports.map(report => (
                                    <div key={report.id} className="flex justify-between items-center p-3 border border-red-100 rounded-lg bg-white">
                                        <div>
                                            <p className="font-bold text-cinematic-dark">{report.registryChild.displayName}</p>
                                            <p className="text-xs text-red-600">Period: {report.reportingPeriod}</p>
                                        </div>
                                        <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">INTERVENTION REQUIRED</Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 2. Sponsor Engagement Risk (Sample) */}
                <Card className="border-amber-200 shadow-sm">
                    <CardHeader className="bg-amber-50/50 border-b border-amber-100">
                        <CardTitle className="flex items-center gap-2 text-amber-800">
                            <AlertTriangle className="w-5 h-5" /> Donor At-Risk Radar (Sample)
                        </CardTitle>
                        <CardDescription>Active sponsors showing COOLING or AT_RISK engagement patterns.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {coolingOrAtRisk.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No donors in the sampled cohort are showing at-risk signals.</p>
                        ) : (
                            <div className="space-y-4">
                                {coolingOrAtRisk.map((donor, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 border border-amber-100 rounded-lg bg-white">
                                        <div>
                                            <p className="font-bold text-cinematic-dark">{donor.name}</p>
                                            <p className="text-xs text-amber-600">Tenure: {donor.tenure} days</p>
                                        </div>
                                        <Badge variant="outline" className={`border-amber-200 bg-amber-50 ${donor.classification === 'AT_RISK' ? 'text-red-600' : 'text-amber-700'}`}>
                                            {donor.classification.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 3. Recent Milestones Pipeline */}
                <Card className="border-blue-200 shadow-sm lg:col-span-2">
                    <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                        <CardTitle className="flex items-center gap-2 text-blue-800">
                            <Activity className="w-5 h-5" /> Recent Impact Events
                        </CardTitle>
                        <CardDescription>Safeguarding-approved milestones generating impact narrative emails.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {recentMilestones.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No recent milestones logged.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {recentMilestones.map(milestone => (
                                    <div key={milestone.id} className="p-4 border border-blue-100 rounded-xl bg-white shadow-sm flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs font-bold text-trust-blue uppercase tracking-widest">{milestone.milestoneType.replace(/_/g, " ")}</span>
                                            <p className="font-bold text-cinematic-dark mt-1">{milestone.registryChild.displayName}</p>
                                            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{milestone.description}</p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400">
                                            {new Date(milestone.achievedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <p className="text-center text-xs text-gray-400 mt-12! uppercase tracking-widest">
                Observational Data Only &bull; Protected under Safeguarding Governance Layer
            </p>
        </div>
    );
}
