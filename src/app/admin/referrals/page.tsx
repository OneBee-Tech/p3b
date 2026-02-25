import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Download, CheckSquare, Clock, Filter, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { updateReferralStatus, approveAndConvertReferral } from "./actions";

export const dynamic = "force-dynamic";

export default async function ReferralsQueuePage({
    searchParams
}: {
    searchParams: { status?: string }
}) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") return null;

    const whereClause = searchParams.status ? { status: searchParams.status as any } : {};

    const referrals = await prisma.referral.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Referral Review Queue</h1>
                    <p className="text-white/60">Triage community submissions and securely convert approved cases into the Registry.</p>
                </div>
                <div className="flex items-center gap-3">
                    <form action="/api/admin/export/referrals" method="GET">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-colors">
                            <Download className="w-4 h-4" />
                            Export Pipeline CSV
                        </button>
                    </form>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-cinematic-dark/50 border border-white/10 rounded-2xl p-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-white/50 text-sm font-medium mr-2">
                    <Filter className="w-4 h-4" /> Queue Filter:
                </div>

                <Link href={`/admin/referrals`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${!searchParams.status ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-white/50 border-white/5 hover:bg-white/5'}`}>
                    All Submissions
                </Link>

                <Link href={`/admin/referrals?status=PENDING`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${searchParams.status === 'PENDING' ? 'bg-impact-gold/20 text-impact-gold border-impact-gold/30' : 'bg-transparent text-white/50 border-white/5 hover:bg-white/5'}`}>
                    Pending (Action Required)
                </Link>

                <Link href={`/admin/referrals?status=UNDER_REVIEW`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${searchParams.status === 'UNDER_REVIEW' ? 'bg-trust-blue/20 text-trust-blue border-trust-blue/30' : 'bg-transparent text-white/50 border-white/5 hover:bg-white/5'}`}>
                    Under Review
                </Link>
            </div>

            {/* Data Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Submitted By / Date</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Child Context</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Urgency</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Review Status</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {referrals.map((ref: any) => {
                                const isArchived = ref.status === "ARCHIVED" || ref.status === "REJECTED";
                                const isApproved = ref.status === "APPROVED";

                                return (
                                    <tr key={ref.id} className={`hover:bg-white/5 transition-colors ${isArchived ? 'opacity-50' : ''}`}>
                                        <td className="p-4">
                                            <div className="font-bold text-white mb-1">{ref.referrerName}</div>
                                            <div className="text-xs text-white/50">
                                                {ref.email} • {new Date(ref.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4 max-w-[200px]">
                                            <p className="text-sm text-white truncate font-medium">{ref.childLocation}</p>
                                            <p className="text-xs text-white/50 truncate mb-1 border-b border-white/5 pb-1">{ref.educationStatus}</p>
                                            <p className="text-[10px] text-white/40 line-clamp-2">{ref.notes}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 text-xs font-bold uppercase rounded-md ${ref.urgencyLevel === "CRITICAL" ? "bg-rose-500/20 text-rose-400" :
                                                ref.urgencyLevel === "HIGH" ? "bg-orange-500/20 text-orange-400" :
                                                    "bg-white/10 text-white/60"
                                                }`}>
                                                {ref.urgencyLevel}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <form action={async (formData) => {
                                                "use server";
                                                await updateReferralStatus(ref.id, formData.get("status"));
                                            }}
                                                className="flex flex-col gap-2"
                                            >
                                                <select
                                                    name="status"
                                                    defaultValue={ref.status}
                                                    disabled={isApproved}
                                                    className="bg-cinematic-dark border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-trust-blue"
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                                                    <option value="APPROVED" disabled>APPROVED</option>
                                                    <option value="REJECTED">REJECTED</option>
                                                    <option value="ARCHIVED">ARCHIVED</option>
                                                </select>
                                                {!isApproved && (
                                                    <button type="submit" className="text-[10px] bg-white/10 hover:bg-white/20 text-white rounded-md px-2 py-1 transition-colors self-start">
                                                        Update
                                                    </button>
                                                )}
                                            </form>
                                        </td>
                                        <td className="p-4 text-right">
                                            {!isApproved && !isArchived && (
                                                <form action={async () => {
                                                    "use server";
                                                    await approveAndConvertReferral(ref.id);
                                                }}>
                                                    <button type="submit" className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold transition-colors">
                                                        <CheckSquare className="w-3 h-3" />
                                                        Approve & Convert
                                                    </button>
                                                </form>
                                            )}
                                            {isApproved && (
                                                <span className="text-xs text-emerald-400 font-bold flex items-center justify-end gap-1">
                                                    <CheckSquare className="w-3 h-3" /> Ingested
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}

                            {referrals.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-white/50">
                                        No referrals found in the queue for this criteria.
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
