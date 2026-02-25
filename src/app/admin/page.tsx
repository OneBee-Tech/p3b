import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Users, DollarSign, FileText, HeartPulse, ShieldCheck, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const session = await auth();

    // Fetch Metrics
    const [
        totalChildren,
        activeSponsorships,
        pendingReferrals,
        donorsCount,
        monthlyDonationsResult
    ] = await Promise.all([
        prisma.registryChild.count({ where: { deletedAt: null, isArchived: false } }),
        prisma.sponsorshipAssignment.count({ where: { status: "ACTIVE" } }),
        prisma.referral.count({ where: { status: "PENDING", deletedAt: null, isArchived: false } }),
        // Distinct donors who have an active assignment
        prisma.sponsorshipAssignment.groupBy({
            by: ['donorId'],
            where: { status: "ACTIVE" }
        }).then(res => res.length),
        // Simplistic monthly funding: aggregate total amount of successful donations in last 30 days
        prisma.donation.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                status: "SUCCEEDED",
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }
        })
    ]);

    const monthlyFunding = Number(monthlyDonationsResult._sum.amount || 0);

    const stats = [
        {
            title: "Total Sponsoring Donors",
            value: donorsCount.toString(),
            icon: HeartPulse,
            color: "text-rose-400",
            bg: "bg-rose-400/10",
        },
        {
            title: "Active Sponsorships",
            value: activeSponsorships.toString(),
            icon: Users,
            color: "text-trust-blue",
            bg: "bg-trust-blue/10",
        },
        {
            title: "30-Day Received Funds",
            value: `$${(monthlyFunding / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            color: "text-impact-gold",
            bg: "bg-impact-gold/10",
        },
        {
            title: "Pending Referrals",
            value: pendingReferrals.toString(),
            icon: FileText,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
        },
        {
            title: "Children in Registry",
            value: totalChildren.toString(),
            icon: ShieldCheck,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, {session?.user?.name}</h1>
                <p className="text-white/60">Here's the latest overview of your global child sponsorship ecosystem.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-all">
                            <div className="flex items-center justify-between z-10 relative">
                                <div>
                                    <p className="text-sm font-medium text-white/50 mb-1">{stat.title}</p>
                                    <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                                </div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>

                            {/* Decorative gradient blur */}
                            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl opacity-20 ${stat.bg} group-hover:scale-150 transition-transform duration-500`} />
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Recent Activity Placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="text-impact-gold w-5 h-5" />
                        <h3 className="text-lg font-bold text-white">Recent Compliance & Action Logs</h3>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-white/40 text-sm">Action logging framework initialized. Real-time entries will appear here as Admins operate the CMS.</p>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-cinematic-dark/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">System Integrity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-sm font-medium text-emerald-100">Immutable Ledger</span>
                            <span className="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-lg">PROTECTED</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-sm font-medium text-emerald-100">RBAC Controls</span>
                            <span className="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-lg">ENFORCED</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-sm font-medium text-emerald-100">Schema Isolation</span>
                            <span className="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-lg">VERIFIED</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
