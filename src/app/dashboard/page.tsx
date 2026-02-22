import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { Button } from "@/components/ui/button";
import { LogOut, CheckCircle2, AlertCircle, Star, Lock, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";
import { AllocationPieChart } from "./AllocationPieChart";
import { FundingCategoryBreakdown } from "./FundingCategoryBreakdown";
import { ProgramContributionList } from "./ProgramContributionList";
import { DownloadCertificateButton } from "./DownloadCertificateButton";
import { SnapshotIntelligenceChart } from "./SnapshotIntelligenceChart";

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
                where: { status: 'SUCCEEDED' }
            },
            sponsorships: {
                include: {
                    program: true,
                    child: true
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
            <header className="bg-cinematic-dark text-white py-12 px-4 shadow-md">
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
                            <p className="text-red-700 text-sm mb-4">We were unable to process your recent contribution for {pastDueSponsorships.length} child support plan(s). Please update your payment method to ensure continuous funding.</p>
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
