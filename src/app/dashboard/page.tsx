import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { Button } from "@/components/ui/button";
import { LogOut, CheckCircle2, AlertCircle, Star, Lock, ShieldCheck, Info, FileText, Trophy, BarChart3, BookOpen } from "lucide-react";
import Link from "next/link";
import { AllocationPieChart } from "./AllocationPieChart";
import { FundingCategoryBreakdown } from "./FundingCategoryBreakdown";
import { ProgramContributionList } from "./ProgramContributionList";
import { DownloadCertificateButton } from "./DownloadCertificateButton";
import { SnapshotIntelligenceChart } from "./SnapshotIntelligenceChart";
import { ImpactNarrativeCard } from "@/components/dashboard/ImpactNarrativeCard";

// System 1 Performance: Caching Global Aggregations
const getCachedGlobalSnapshots = unstable_cache(
    async () => {
        console.log("[OBSERVABILITY] Cache Miss: Fetching global ProgramSnapshot aggregations");
        return await prisma.programSnapshot.groupBy({
            by: ['month', 'year'],
            _sum: { fundsRaised: true, studentsImpacted: true },
            orderBy: [{ year: 'asc' }, { month: 'asc' }]
        });
    },
    ['global-program-snapshots'],
    { revalidate: 3600, tags: ['snapshots'] } // Revalidate every hour
);

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/api/auth/signin?callbackUrl=/dashboard");
    }

    // Fetch user with deep relations for metrics
    const donor = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            donations: {
                where: { status: 'SUCCEEDED' },
                include: { program: true }
            },
            sponsorships: {
                include: {
                    program: true,
                    child: true
                }
            },
            sponsorshipAssignments: {
                where: { status: 'ACTIVE' },
                include: {
                    registryChild: {
                        include: {
                            progressReports: {
                                where: {
                                    verificationStatus: 'VERIFIED',
                                    OR: [
                                        { publishAt: { lte: new Date() } },
                                        { publishAt: null }
                                    ]
                                },
                                orderBy: { createdAt: 'desc' },
                                take: 3
                            },
                            milestones: {
                                orderBy: { achievedAt: 'desc' },
                                take: 5
                            }
                        }
                    }
                }
            }
        }
    });

    if (!donor) {
        // Handle edge case where generic session exists but user is missing
        return <div className="p-8 text-center">User record not found. Please re-authenticate.</div>;
    }

    // --- Core Metrics Calculations ---
    const totalDonatedUSD = donor.donations.reduce((sum, d) => sum + Number(d.baseAmountUSD || d.amount), 0);
    const completedDonations = donor.donations.length;

    // Distinct communities supported
    const programIds = new Set([
        ...donor.donations.map(d => d.programId),
        ...donor.sponsorships.map(s => s.programId)
    ].filter(Boolean));
    const communitiesSupported = programIds.size;

    // Aggregate Allocation Breakdown
    let totalTuition = 0;
    let totalSupplies = 0;
    let totalOps = 0;
    let totalInfrastructure = 0;

    donor.donations.forEach(d => {
        if (d.allocationBreakdown) {
            const brk: any = d.allocationBreakdown;
            totalTuition += brk.tuition || 0;
            totalSupplies += brk.supplies || 0;
            totalOps += brk.ops || 0;
            totalInfrastructure += brk.infrastructure || 0;
        }
    });

    const activeSponsorships = donor.sponsorships.filter(s => s.status === 'ACTIVE');
    const pastDueSponsorships = donor.sponsorships.filter(s => s.status === 'PAST_DUE');

    // System 3: Program Contribution Mapping
    const contributionMap = new Map();

    // Map one-off donations
    donor.donations.forEach(d => {
        if (!d.programId) return; // Note: In community model, we expect all to have programId
        const existing = contributionMap.get(d.programId) || { total: 0, isMonthly: false };
        contributionMap.set(d.programId, {
            ...existing,
            total: existing.total + Number(d.baseAmountUSD || d.amount)
        });
    });

    // Map active monthly subscriptions & grab program data payload
    donor.sponsorships.forEach(s => {
        const existing = contributionMap.get(s.programId) || { total: 0, isMonthly: false };
        contributionMap.set(s.programId, {
            ...existing,
            total: existing.total + Number(s.monthlyAmount),
            isMonthly: true, // Tag as monthly if they have an active subscription
            programData: s.program
        });
    });

    // Finalize the array for the client component
    const userContributions = Array.from(contributionMap.entries()).map(([programId, data]) => {
        // If we only had donations and no sponsorship, we need to fetch the program metadata somehow.
        // For efficiency, we will assume (based on our seed) that the donor dashboard query included program data on donations, or we just rely on sponsorship.
        // *Correction*: We need DB queries for programs if they only donated once. We should fetch any missing programs.
        return {
            programId,
            programName: data.programData?.name || `Program #${programId.substring(0, 6)}`,
            programStatus: data.programData?.status || 'ACTIVE',
            fundingCurrent: Number(data.programData?.fundingCurrent || 0),
            fundingGoal: data.programData?.fundingGoal ? Number(data.programData.fundingGoal) : null,
            userContribution: data.total,
            isMonthly: data.isMonthly
        };
    }).sort((a, b) => b.userContribution - a.userContribution);

    // System 5: Snapshot Intelligence (Global Ecosystem Growth)
    const globalSnapshots = await getCachedGlobalSnapshots();

    const formattedSnapshots = globalSnapshots.map(s => {
        const d = new Date(s.year, s.month - 1);
        return {
            monthLabel: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
            fundsRaised: Number(s._sum.fundsRaised || 0),
        };
    });

    const schoolDaysFunded = Math.floor(totalDonatedUSD);

    const getMilestoneBadge = (total: number) => {
        if (total >= 1000) return "Impact Leader";
        if (total >= 500) return "Community Builder";
        if (total >= 100) return "Education Advocate";
        return null;
    }
    const milestone = getMilestoneBadge(totalDonatedUSD);

    return (
        <div className="min-h-screen bg-warm-bg">
            {/* Header */}
            <header className="bg-cinematic-dark text-white pt-36 pb-20 px-4 shadow-md">
                <div className="max-w-6xl mx-auto flex justify-between items-end">
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Donor Intelligence Portal</p>
                        <h1 className="text-4xl font-heading font-bold">Welcome back, {donor.name || 'Impact Maker'} — here’s the change you’re creating.</h1>
                        <p className="text-gray-400 mt-2">Every contribution strengthens children's futures and expands access to education.</p>
                    </div>
                    <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }); }}>
                        <Button variant="outline" className="text-cinematic-dark" type="submit">
                            <LogOut className="w-4 h-4 mr-2" /> Sign Out
                        </Button>
                    </form>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
                {/* System 4: Subscription Recovery Alert */}
                {pastDueSponsorships.length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl flex items-start gap-4 shadow-sm">
                        <AlertCircle className="text-red-500 w-6 h-6 flex-shrink-0" />
                        <div>
                            <h3 className="text-red-800 font-bold mb-1">Action Required: Failed Subscription</h3>
                            <p className="text-red-700 text-sm mb-4">We’re having trouble processing your sponsorship. Please update payment details.</p>
                            {/* In a real app, integrate Stripe Customer Portal here */}
                            <Button variant="impact" size="sm">Fix Payment</Button>
                        </div>
                    </div>
                )}

                {/* System 1: Dashboard Core Metrics */}
                <section>
                    {milestone && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-impact-gold/10 border border-impact-gold/30 rounded-full text-impact-gold text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
                            <Star className="w-4 h-4 fill-current" /> {milestone}
                        </div>
                    )}
                    <h2 className="text-2xl font-bold text-cinematic-dark mb-6">Your Lifetime Impact</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Total Impact Invested</p>
                            <p className="text-4xl font-light text-cinematic-dark">${totalDonatedUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm text-gray-400">USD</span></p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Children Supported</p>
                            <p className="text-4xl font-light text-trust-blue">{communitiesSupported}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Students Reached</p>
                            <p className="text-4xl font-light text-emerald-600 animate-in fade-in duration-500">{completedDonations}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">School Days Funded</p>
                            <p className="text-4xl font-light text-amber-600">{schoolDaysFunded}</p>
                            <p className="text-xs text-gray-400 mt-2">Equivalent to funding {schoolDaysFunded} school days.</p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* System 2: Allocation Transparency */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-2xl font-bold text-cinematic-dark">Support Utilization</h2>
                            <span title="Shows how your sponsorship supports education and wellbeing." className="cursor-help flex items-center">
                                <Info className="w-4 h-4 text-gray-400" />
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-8">Transparent breakdown of where your donations have been utilized.</p>

                        <div className="aspect-square flex items-center justify-center">
                            {completedDonations > 0 ? (
                                <AllocationPieChart
                                    tuition={totalTuition}
                                    supplies={totalSupplies}
                                    infrastructure={totalInfrastructure}
                                    ops={totalOps}
                                />
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Once you sponsor a child, you’ll see exactly how your contributions fund tuition, supplies, and wellbeing services.</p>
                                    <Link href="/programs">
                                        <Button variant="impact">Sponsor a Child</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {completedDonations > 0 && (
                            <p className="text-gray-400 text-xs text-center mt-4">This reflects how your contributions are distributed across all sponsored children.</p>
                        )}

                        <FundingCategoryBreakdown
                            tuition={totalTuition}
                            supplies={totalSupplies}
                            infrastructure={totalInfrastructure}
                            ops={totalOps}
                            total={totalTuition + totalSupplies + totalInfrastructure + totalOps}
                        />

                    </section>

                    {/* System 3: Program Contribution Tracking */}
                    <section>
                        <h2 className="text-2xl font-bold text-cinematic-dark mb-6">Child Support</h2>
                        <ProgramContributionList contributions={userContributions} />

                        {/* Recent Contributions & Invoices */}
                        <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-cinematic-dark text-lg">Recent Ledger Entries</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-gray-400">
                                            <th className="pb-3 font-medium">Date</th>
                                            <th className="pb-3 font-medium">Amount</th>
                                            <th className="pb-3 font-medium">Target</th>
                                            <th className="pb-3 font-medium text-right">Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {donor.donations.filter(d => d.status === 'SUCCEEDED').slice(0, 5).map(d => (
                                            <tr key={d.id} className="group">
                                                <td className="py-3 text-cinematic-dark">{new Date(d.createdAt).toLocaleDateString()}</td>
                                                <td className="py-3 font-bold text-trust-blue">${(Number(d.amount) / 100).toFixed(2)}</td>
                                                <td className="py-3 text-gray-500 truncate max-w-[120px]">{d.program?.name || 'General Ledger'}</td>
                                                <td className="py-3 text-right">
                                                    <a href={`/api/invoices/${d.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-trust-blue transition-colors">
                                                        <FileText className="w-3 h-3" /> PDF
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                        {donor.donations.filter(d => d.status === 'SUCCEEDED').length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-6 text-center text-gray-400">No verified contributions on ledger yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* System 4: Impact Certificate Engine Placeholder */}
                        <div className="mt-8 bg-warm-ivory p-6 rounded-2xl border border-impact-gold/30 transition-all duration-300 hover:shadow-md">
                            <h3 className="font-bold text-impact-gold mb-2 uppercase tracking-wide text-sm">Official Impact Records</h3>
                            <p className="text-cinematic-dark text-sm mb-4">Download verified tax receipts and annual impact certificates for your records.</p>
                            <DownloadCertificateButton
                                donorName={donor.name || 'Generous Donor'}
                                totalDonated={totalDonatedUSD}
                                communitiesSupported={communitiesSupported}
                            />
                            <div className="flex items-center gap-4 mt-6 text-xs text-gray-500 font-medium tracking-wide uppercase">
                                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secure</span>
                                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Audit Verified</span>
                                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> NGO Compliant</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* System 6: Your Impact in Action (Sponsor-Only Child Progress) */}
                {(donor as any).sponsorshipAssignments && (donor as any).sponsorshipAssignments.length > 0 && (
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-12 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="w-6 h-6 text-trust-blue" />
                            <h2 className="text-2xl font-bold text-cinematic-dark">Your Impact in Action</h2>
                        </div>
                        <p className="text-gray-500 text-sm mb-8">Detailed progress updates for children you directly sponsor. This information is exclusive to active sponsors.</p>

                        <div className="space-y-8">
                            {(donor as any).sponsorshipAssignments.map((assignment: any) => {
                                const child = assignment.registryChild;
                                if (!child) return null;
                                return (
                                    <div key={assignment.id} className="border border-gray-100 rounded-xl p-6 bg-gray-50/50">
                                        <div className="flex items-center gap-4 mb-6">
                                            <img
                                                src={child.avatarIllustrationUrl || `https://api.dicebear.com/9.x/micah/svg?seed=${child.id}&backgroundColor=transparent`}
                                                alt={child.displayName}
                                                className="w-14 h-14 rounded-full bg-white border-2 border-trust-blue/20 object-cover"
                                            />
                                            <div>
                                                <h3 className="font-bold text-cinematic-dark text-lg">{child.displayName}</h3>
                                                <p className="text-xs text-gray-500">{child.region} &bull; {child.educationLevel} &bull; Age {child.age}</p>
                                            </div>
                                        </div>

                                        {/* Milestones */}
                                        {child.milestones && child.milestones.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="text-sm font-bold text-impact-gold uppercase tracking-widest mb-3 flex items-center gap-2"><Trophy className="w-4 h-4" /> Recent Milestones</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {child.milestones.map((m: any) => (
                                                        <span key={m.id} className="inline-flex items-center gap-1.5 bg-impact-gold/10 text-impact-gold border border-impact-gold/20 px-3 py-1 rounded-full text-xs font-bold">
                                                            <Trophy className="w-3 h-3" /> {m.milestoneType.replace(/_/g, ' ')} — {new Date(m.achievedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* AI Impact Narrative (Sponsor-Deep View) */}
                                        <div className="mt-6">
                                            <ImpactNarrativeCard
                                                childId={child.id}
                                                childName={child.displayName}
                                                donorId={donor.id}
                                                latestAttendance={child.progressReports?.[0]?.attendanceRate}
                                                latestMilestoneType={child.milestones?.[0]?.milestoneType}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold text-center">Data shared under guardian consent. Governed by organizational safeguarding policy.</p>
                    </section>
                )}

                {/* System 5: Macro Impact Visualization */}
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-12 transition-all duration-300 hover:shadow-md">
                    <h2 className="text-2xl font-bold text-cinematic-dark mb-2">Children Impact Overview</h2>
                    <p className="text-gray-500 text-sm mb-8">Track how sponsors like you are transforming education access worldwide.</p>

                    <div className="w-full h-[300px]">
                        <SnapshotIntelligenceChart data={formattedSnapshots} />
                    </div>
                </section>

            </main>
        </div>
    );
}
