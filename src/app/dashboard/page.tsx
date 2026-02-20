import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { AllocationPieChart } from "./AllocationPieChart";
import { DownloadCertificateButton } from "./DownloadCertificateButton";
import { SnapshotIntelligenceChart } from "./SnapshotIntelligenceChart";

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

    // System 5: Snapshot Intelligence (Global Ecosystem Growth)
    const globalSnapshots = await prisma.programSnapshot.groupBy({
        by: ['month', 'year'],
        _sum: { fundsRaised: true, studentsImpacted: true },
        orderBy: [{ year: 'asc' }, { month: 'asc' }]
    });

    const formattedSnapshots = globalSnapshots.map(s => {
        const d = new Date(s.year, s.month - 1);
        return {
            monthLabel: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
            fundsRaised: Number(s._sum.fundsRaised || 0),
        };
    });

    return (
        <div className="min-h-screen bg-warm-bg">
            {/* Header */}
            <header className="bg-cinematic-dark text-white py-12 px-4 shadow-md">
                <div className="max-w-6xl mx-auto flex justify-between items-end">
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Donor Intelligence Portal</p>
                        <h1 className="text-4xl font-heading font-bold">Welcome back, {donor.name || 'Impact Maker'}</h1>
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
                            <p className="text-red-700 text-sm mb-4">We were unable to process your recent contribution for {pastDueSponsorships.length} community support plan(s). Please update your payment method to ensure continuous funding.</p>
                            {/* In a real app, integrate Stripe Customer Portal here */}
                            <Button variant="impact" size="sm">Fix Payment</Button>
                        </div>
                    </div>
                )}

                {/* System 1: Dashboard Core Metrics */}
                <section>
                    <h2 className="text-2xl font-bold text-cinematic-dark mb-6">Your Lifetime Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Normalized Funding</p>
                            <p className="text-4xl font-light text-cinematic-dark">${totalDonatedUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm text-gray-400">USD</span></p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Communities Funded</p>
                            <p className="text-4xl font-light text-trust-blue">{communitiesSupported}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Total Contributions</p>
                            <p className="text-4xl font-light text-emerald-600">{completedDonations} <span className="text-sm text-gray-400">Transactions</span></p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* System 2: Allocation Transparency */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-cinematic-dark mb-2">Fund Allocation</h2>
                        <p className="text-gray-500 text-sm mb-8">Transparent breakdown of where your donations have been utilized across all supported programs.</p>

                        <div className="aspect-square flex items-center justify-center">
                            {completedDonations > 0 ? (
                                <AllocationPieChart
                                    tuition={totalTuition}
                                    supplies={totalSupplies}
                                    infrastructure={totalInfrastructure}
                                    ops={totalOps}
                                />
                            ) : (
                                <p className="text-gray-400">No allocation data available yet.</p>
                            )}
                        </div>
                    </section>

                    {/* Active Contributions List */}
                    <section>
                        <h2 className="text-2xl font-bold text-cinematic-dark mb-6">Active Subscriptions</h2>
                        <div className="space-y-4">
                            {activeSponsorships.length > 0 ? activeSponsorships.map(sponsorship => (
                                <div key={sponsorship.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-cinematic-dark">{sponsorship.program.name}</h3>
                                        <p className="text-sm text-gray-500">Tier: {sponsorship.tier}</p>
                                        {sponsorship.child && (
                                            <p className="text-xs text-gray-400 mt-1">Represented by: {sponsorship.child.name}</p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl text-trust-blue">${Number(sponsorship.monthlyAmount)}/mo</p>
                                        <p className="text-xs text-emerald-600 flex items-center gap-1 justify-end"><CheckCircle2 className="w-3 h-3" /> Active</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="bg-white p-8 text-center rounded-2xl border border-gray-100 text-gray-500">
                                    <p className="mb-4">You have no active monthly subscriptions.</p>
                                    <Link href="/sponsor">
                                        <Button variant="outline">Discover Communities</Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* System 3: Impact Certificate Engine Placeholder */}
                        <div className="mt-8 bg-warm-ivory p-6 rounded-2xl border border-impact-gold/30">
                            <h3 className="font-bold text-impact-gold mb-2 uppercase tracking-wide text-sm">Official Records</h3>
                            <p className="text-cinematic-dark text-sm mb-4">Download your end-of-year tax receipts and official Impact Certificates.</p>
                            <DownloadCertificateButton
                                donorName={donor.name || 'Geneous Donor'}
                                totalDonated={totalDonatedUSD}
                                communitiesSupported={communitiesSupported}
                            />
                        </div>
                    </section>
                </div>

                {/* System 5: Macro Impact Visualization */}
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-12">
                    <h2 className="text-2xl font-bold text-cinematic-dark mb-2">Ecosystem Growth over Time</h2>
                    <p className="text-gray-500 text-sm mb-8">Watch the collective power of our donor community expand, tracking total funds raised across all active ONG programs.</p>

                    <div className="w-full h-[300px]">
                        <SnapshotIntelligenceChart data={formattedSnapshots} />
                    </div>
                </section>

            </main>
        </div>
    );
}
