import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Activity, ShieldCheck, Globe, GraduationCap, Users, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { getCSRDashboardMetrics } from "./actions";

export const metadata: Metadata = {
    title: "Institutional Corporate CSR Dashboard | NGO Admin",
    description: "ESG reporting and corporate sponsorship metric aggregation.",
};

export default async function CorporateImpactDashboardPage() {
    const session = await auth();

    // 1. Role-Based Access Control
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    const metrics = await getCSRDashboardMetrics();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                        <Activity className="w-8 h-8 text-impact-gold" />
                        Institutional CSR Dashboard
                    </h1>
                    <p className="text-white/60 mt-2">Aggregated ESG reporting, gap coverage, and pipeline metrics for all corporate partners.</p>
                </div>

                <div className="flex gap-3">
                    <Link
                        href="/admin/corporate"
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-medium transition-colors border border-white/10 whitespace-nowrap"
                    >
                        <ShieldCheck className="w-5 h-5" />
                        Manage Corporate Sponsors
                    </Link>
                </div>
            </div>

            {/* Headline Metrics Layer */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-trust-blue/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-3 text-white/50 mb-2 relative z-10">
                        <Users className="w-5 h-5 text-trust-blue" />
                        <h3 className="font-medium text-sm">Active CSR Slots</h3>
                    </div>
                    <p className="text-3xl font-heading font-bold text-white relative z-10 font-mono">
                        {metrics.filledSlots} <span className="text-sm font-sans text-white/30 font-medium">/ {metrics.totalCapacity} cap</span>
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-impact-gold/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-3 text-white/50 mb-2 relative z-10">
                        <ShieldCheck className="w-5 h-5 text-impact-gold" />
                        <h3 className="font-medium text-sm">Funding Gap Coverage</h3>
                    </div>
                    <p className="text-3xl font-heading font-bold text-white relative z-10 font-mono">
                        {metrics.coveragePercentage}%
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-3 text-white/50 mb-2 relative z-10">
                        <HeartHandshake className="w-5 h-5 text-purple-400" />
                        <h3 className="font-medium text-sm">Corporate Fund Share</h3>
                    </div>
                    <p className="text-3xl font-heading font-bold text-white relative z-10 font-mono">
                        {metrics.corporateSharePercentage}%
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-3 text-white/50 mb-2 relative z-10">
                        <GraduationCap className="w-5 h-5 text-green-400" />
                        <h3 className="font-medium text-sm">Total Beneficiaries Map</h3>
                    </div>
                    <p className="text-3xl font-heading font-bold text-white relative z-10 font-mono">
                        {metrics.totalChildrenLinked}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Graduation Pipeline Panel */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                        <GraduationCap className="w-5 h-5 text-green-400" />
                        Corporate Graduation Pipeline
                    </h2>
                    {metrics.graduationPipeline.length === 0 ? (
                        <div className="py-8 text-center text-white/40 border border-white/5 border-dashed rounded-xl">
                            No pipeline data available. Allocate children to generate ESG metrics.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {metrics.graduationPipeline.map((level, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                                        <span className="text-white/80">{level.level.replace(/_/g, ' ')}</span>
                                        <span className="text-white font-mono">{level.count}</span>
                                    </div>
                                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="bg-green-500 h-full rounded-full"
                                            style={{ width: `${(level.count / metrics.totalChildrenLinked) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Region Density Panel */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                        <Globe className="w-5 h-5 text-trust-blue" />
                        Institutional Funding Density
                    </h2>
                    {metrics.regionHeatmap.length === 0 ? (
                        <div className="py-8 text-center text-white/40 border border-white/5 border-dashed rounded-xl">
                            No regional distribution data available.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {metrics.regionHeatmap.map((r, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                                        <span className="text-white/80">{r.region}</span>
                                        <span className="text-white font-mono">{r.count}</span>
                                    </div>
                                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="bg-trust-blue h-full rounded-full"
                                            style={{ width: `${(r.count / metrics.totalChildrenLinked) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
