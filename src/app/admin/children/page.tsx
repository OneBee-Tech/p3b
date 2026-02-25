import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Plus, Download, Edit2, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ChildrenRegistryPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") return null;

    const children = await prisma.registryChild.findMany({
        where: {
            deletedAt: null,
            isArchived: false,
        },
        include: {
            assignments: {
                where: { status: "ACTIVE" }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Child Registry</h1>
                    <p className="text-white/60">Manage sponsored children, monitor safeguarding compliance, and export data.</p>
                </div>
                <div className="flex items-center gap-3">
                    <form action="/api/admin/export/children" method="GET">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-colors">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </form>
                    <Link href="/admin/children/new" className="flex items-center gap-2 px-4 py-2 bg-impact-gold hover:bg-impact-gold/90 text-cinematic-dark rounded-xl font-bold transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Child
                    </Link>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Child Name</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Demographics</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Sponsors Cap</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Privacy / Status</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Safeguarding</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {children.map((child) => {
                                const activeSponsors = child.assignments.length;
                                const isFullyFunded = activeSponsors >= child.maxSponsors;

                                return (
                                    <tr key={child.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-trust-blue/20 flex items-center justify-center border border-trust-blue/30 overflow-hidden">
                                                    {child.avatarIllustrationUrl ? (
                                                        <img src={child.avatarIllustrationUrl} alt={child.displayName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-trust-blue font-bold text-sm">{child.displayName.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{child.displayName}</p>
                                                    <p className="text-xs text-white/50 flex items-center gap-1">
                                                        ID: {child.id.slice(-6).toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-white">{child.age} yrs • {child.region}</p>
                                            <p className="text-xs text-white/50">{child.educationLevel}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden w-24">
                                                    <div
                                                        className={`h-full rounded-full ${isFullyFunded ? 'bg-emerald-400' : 'bg-impact-gold'}`}
                                                        style={{ width: `${Math.min(100, (activeSponsors / child.maxSponsors) * 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-white/70">
                                                    {activeSponsors}/{child.maxSponsors}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1 items-start">
                                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${child.privacyMode === "SPONSOR_ONLY" ? "bg-red-500/20 text-red-400" : "bg-trust-blue/20 text-trust-blue"
                                                    }`}>
                                                    {child.privacyMode}
                                                </span>
                                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${child.status === "WAITING" ? "bg-impact-gold/20 text-impact-gold" : "bg-emerald-500/20 text-emerald-400"
                                                    }`}>
                                                    {child.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {child.safeguardingReviewStatus === "VERIFIED" ? (
                                                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                                                        <ShieldAlert className="w-3 h-3" />
                                                        Verified
                                                    </span>
                                                ) : child.safeguardingReviewStatus === "FLAGGED" ? (
                                                    <span className="text-red-400 text-xs font-bold flex items-center gap-1">
                                                        <ShieldAlert className="w-3 h-3" />
                                                        Flagged
                                                    </span>
                                                ) : (
                                                    <span className="text-white/40 text-xs font-bold flex items-center gap-1">
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link href={`/admin/children/${child.id}/edit`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}

                            {children.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-white/50">
                                        No active child records found. Click "Add Child" to ingest via the CMS.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
