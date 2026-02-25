import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Download, Filter, ShieldAlert, FileSearch } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DonationMonitorPage({
    searchParams
}: {
    searchParams: { page?: string, type?: string, status?: string }
}) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") return null;

    const page = Number(searchParams.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (searchParams.type) whereClause.type = searchParams.type;
    if (searchParams.status) whereClause.status = searchParams.status;

    // Fetch total count and paginated donations
    const [totalCount, donations] = await Promise.all([
        prisma.donation.count({ where: whereClause }),
        prisma.donation.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                program: { select: { name: true } },
            }
        })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header & Governance Banner */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Ledger Monitor</h1>
                    <p className="text-white/60">Immutable financial tracking. All ledger actions are strictly read-only.</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                    <form action="/api/admin/export/donations" method="GET">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-colors">
                            <Download className="w-4 h-4" />
                            Export Ledger Snapshot
                        </button>
                    </form>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs font-bold">
                        <ShieldAlert className="w-3 h-3" />
                        READ-ONLY GOVERNANCE ENFORCED
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-cinematic-dark/50 border border-white/10 rounded-2xl p-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-white/50 text-sm font-medium mr-2">
                    <Filter className="w-4 h-4" /> Filters:
                </div>

                <Link href={`/admin/donations?page=1`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${!searchParams.type && !searchParams.status ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-white/50 border-white/5 hover:bg-white/5'}`}>
                    All View
                </Link>

                <Link href={`/admin/donations?type=RECURRING_MONTHLY&page=1`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${searchParams.type === 'RECURRING_MONTHLY' ? 'bg-trust-blue/20 text-trust-blue border-trust-blue/30' : 'bg-transparent text-white/50 border-white/5 hover:bg-white/5'}`}>
                    Recurring Only
                </Link>

                <Link href={`/admin/donations?status=SUCCEEDED&page=1`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${searchParams.status === 'SUCCEEDED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-transparent text-white/50 border-white/5 hover:bg-white/5'}`}>
                    Succeeded Only
                </Link>

                <div className="ml-auto text-sm text-impact-gold font-bold">
                    {totalCount} Total Entries
                </div>
            </div>

            {/* Read-Only Data Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Transaction ID & Date</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Donor Identity</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Target Fund</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-right">Amount (USD)</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-center">Engine Status</th>
                                <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-center">Allocation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {donations.map((d) => (
                                <tr key={d.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-mono text-xs text-white/80 mb-1">{d.id.slice(0, 12)}...</div>
                                        <div className="text-white/40 text-xs">{new Date(d.createdAt).toLocaleString()}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-white">{d.user?.name || "Anonymous Donor"}</div>
                                        <div className="text-white/50 text-xs">{d.user?.email || "No email on record"}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${d.type === "RECURRING_MONTHLY" ? "bg-purple-500/20 text-purple-400" : "bg-white/10 text-white/60"
                                                }`}>
                                                {d.type === "RECURRING_MONTHLY" ? "Sponsorship" : "One-Time"}
                                            </span>
                                        </div>
                                        <div className="mt-1 text-white/70 text-xs">
                                            {d.program?.name || "General Ledger"}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-mono font-bold text-white">
                                        ${(Number(d.amount) / 100).toFixed(2)}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${d.status === "SUCCEEDED" ? "bg-emerald-500/20 text-emerald-400" :
                                                d.status === "PENDING" ? "bg-impact-gold/20 text-impact-gold" :
                                                    "bg-red-500/20 text-red-400"
                                            }`}>
                                            {d.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${d.allocationStatus === "APPROVED" ? "bg-emerald-500/20 text-emerald-400" :
                                                d.allocationStatus === "AUTOMATED" ? "bg-trust-blue/20 text-trust-blue" :
                                                    "bg-white/10 text-white/60"
                                            }`}>
                                            {d.allocationStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {donations.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-white/50 flex flex-col items-center gap-3">
                                        <FileSearch className="w-8 h-8 text-white/20" />
                                        No ledger records matches the current filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-white/10 flex items-center justify-between">
                        <p className="text-xs text-white/40">Showing page {page} of {totalPages}</p>
                        <div className="flex items-center gap-2">
                            {page > 1 && (
                                <Link href={`/admin/donations?page=${page - 1}${searchParams.type ? `&type=${searchParams.type}` : ''}${searchParams.status ? `&status=${searchParams.status}` : ''}`} className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors">
                                    Previous
                                </Link>
                            )}
                            {page < totalPages && (
                                <Link href={`/admin/donations?page=${page + 1}${searchParams.type ? `&type=${searchParams.type}` : ''}${searchParams.status ? `&status=${searchParams.status}` : ''}`} className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors">
                                    Next Page
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
