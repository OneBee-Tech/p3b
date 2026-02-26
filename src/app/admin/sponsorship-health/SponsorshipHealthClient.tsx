"use client";

import { Activity, AlertTriangle, CheckCircle, Clock, ShieldAlert, UserX } from "lucide-react";

export default function SponsorshipHealthClient({ report, recentLogs, metrics, priorityQueue = [] }: any) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-impact-gold" />
                    Sponsorship Health Monitor
                </h1>
                <p className="text-white/50 text-sm max-w-2xl">
                    Real-time funding stability engine. This dashboard tracks sponsorship retention, identifies churn risks automatically via Stripe webhooks, and highlights children with critical funding gaps.
                </p>
            </div>

            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard icon={<CheckCircle />} title="Active Sponsorships" value={metrics.totalActive} color="text-emerald-400" bg="bg-emerald-500/10" />
                <MetricCard icon={<AlertTriangle />} title="Sponsorships At Risk" value={metrics.atRiskCount} color="text-yellow-400" bg="bg-yellow-500/10" />
                <MetricCard icon={<UserX />} title="Recent Churn (30d)" value={metrics.churnCount} color="text-red-400" bg="bg-red-500/10" />
                <MetricCard icon={<ShieldAlert />} title="Total Funding Gap" value={metrics.childrenNeedingSponsors} color="text-impact-gold" bg="bg-impact-gold/10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Funding Gap Engine Table */}
                {/* Priority Queue & Funding Gap Engine Table */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Priority Queue */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" /> Priority Sponsorship Queue
                        </h2>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-left text-sm text-white">
                                <thead className="bg-black/20 text-white/50 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Child Name</th>
                                        <th className="px-6 py-4 font-bold">Funding Gap</th>
                                        <th className="px-6 py-4 font-bold">Priority</th>
                                        <th className="px-6 py-4 font-bold">Days At Risk</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {priorityQueue.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-white/50 italic">
                                                No children are currently in the emergency priority queue.
                                            </td>
                                        </tr>
                                    ) : (
                                        priorityQueue.map((q: any) => (
                                            <tr key={q.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-medium">{q.childName}</td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono bg-black/30 px-2 py-1 rounded">
                                                        {q.fundingGap} Slots
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {q.priorityLevel === "CRITICAL" ? (
                                                        <span className="text-xs font-bold px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                                                            CRITICAL
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-bold px-2 py-1 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                            HIGH
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-white/60">
                                                    {Math.floor((Date.now() - new Date(q.createdAt).getTime()) / (1000 * 60 * 60 * 24))} Days
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">Children Requiring Sponsors</h2>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-left text-sm text-white">
                                <thead className="bg-black/20 text-white/50 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Child Name</th>
                                        <th className="px-6 py-4 font-bold">Region</th>
                                        <th className="px-6 py-4 font-bold">Active / Max</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {report.all.filter((r: any) => !r.fullySponsored).length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-white/50 italic">
                                                All registered children are fully sponsored.
                                            </td>
                                        </tr>
                                    ) : (
                                        report.all.filter((r: any) => !r.fullySponsored).map((child: any) => (
                                            <tr key={child.childId} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-medium">{child.name}</td>
                                                <td className="px-6 py-4 text-white/60">{child.region}</td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono bg-black/30 px-2 py-1 rounded">
                                                        {child.activeSponsors} / {child.maxSponsors}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {child.status === "CRITICAL" ? (
                                                        <span className="text-xs font-bold px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 inline-flex items-center gap-1">
                                                            <ShieldAlert className="w-3 h-3" /> Critical Gap
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-bold px-2 py-1 rounded bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 inline-flex items-center gap-1">
                                                            <AlertTriangle className="w-3 h-3" /> At Risk
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Grace Period Sponsors */}
                    {report.gracePeriodDetails && report.gracePeriodDetails.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-yellow-500" /> Grace Period
                            </h2>
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                                {report.gracePeriodDetails.map((g: any, i: number) => (
                                    <div key={i} className="bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/20 space-y-1">
                                        <p className="text-sm font-bold text-white">{g.donorName}</p>
                                        <p className="text-xs text-white/70">Child: {g.childName}</p>
                                        <p className="text-xs text-yellow-500/80">Expires: {new Date(g.graceUntil).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Automated Health Logs (Webhooks/Alerts) */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">Recent Lifecycle Events</h2>
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                            {recentLogs.length === 0 ? (
                                <div className="text-center py-8 text-white/40 text-sm">No recent lifecycle alerts.</div>
                            ) : (
                                recentLogs.slice(0, 10).map((log: any) => (
                                    <div key={log.id} className="bg-cinematic-dark/50 p-3 rounded-xl border border-white/5 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${log.healthStatus === "PAYMENT_FAILED" ? "bg-orange-500/20 text-orange-400" :
                                                log.healthStatus === "ENDED" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                                                }`}>
                                                {log.healthStatus.replace('_', ' ')}
                                            </span>
                                            <span className="text-xs text-white/40 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(log.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/80">{log.reason || "System flagged event."}</p>
                                        <p className="text-xs font-mono text-white/40 truncate">Ref: {log.sponsorshipId}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon, title, value, color, bg }: { icon: any, title: string, value: number, color: string, bg: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${bg}`} />
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${bg} ${color}`}>
                    {icon}
                </div>
            </div>
            <p className="text-white/50 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-heading font-bold text-white tracking-tight">{value}</p>
        </div>
    );
}
