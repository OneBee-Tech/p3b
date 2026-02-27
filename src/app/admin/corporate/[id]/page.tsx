import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ShieldCheck, Building2, Link as LinkIcon, Settings, Calendar, Briefcase, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getCorporateSponsorById } from "../actions";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Corporate Profile | NGO Admin",
};

export default async function CorporateSponsorDetailPage({ params }: { params: { id: string } }) {
    const session = await auth();

    // Re-verify Access
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    const sponsor = await getCorporateSponsorById(params.id);

    if (!sponsor) {
        return notFound();
    }

    const capacityPercentage = Math.round((sponsor.allocations.length / sponsor.sponsorshipCapacity) * 100);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/corporate" className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                            Corporate Sponsors
                        </Link>
                        <span className="text-white/30 text-sm">/</span>
                        <span className="text-white text-sm font-medium truncate">{sponsor.organizationName}</span>
                    </div>

                    <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3 mt-2">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-impact-gold" />
                        </div>
                        {sponsor.organizationName}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm">
                        <Settings className="w-4 h-4" /> Edit Profile
                    </button>
                    <Link
                        href={`/admin/corporate/${sponsor.id}/allocations`}
                        className="inline-flex items-center gap-2 bg-trust-blue hover:bg-trust-blue/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm"
                    >
                        <LinkIcon className="w-4 h-4" />
                        Manage Allocations
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Metrics & Identity */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-trust-blue" />
                            Fulfillment Capacity
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white/70">Children Sponsored</span>
                                    <span className="font-medium text-white font-mono">{sponsor.allocations.length} / {sponsor.sponsorshipCapacity}</span>
                                </div>
                                <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden border border-white/5">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${capacityPercentage > 90 ? 'bg-red-500' :
                                                capacityPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-xs text-white/50 mb-1">Funding Model</span>
                                    <span className="inline-block px-2 py-1 rounded bg-white/10 text-xs font-medium text-white/90">
                                        {sponsor.fundingModel.replace('_', ' ')}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-xs text-white/50 mb-1">Status</span>
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 text-xs font-medium text-white/90">
                                        <span className={`w-1.5 h-1.5 rounded-full ${sponsor.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {sponsor.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-purple-400" />
                            Sponsor Identity
                        </h3>
                        <div className="space-y-4 text-sm divide-y divide-white/5">
                            <div className="pb-3 break-all">
                                <span className="block text-white/40 mb-1">Contact Name</span>
                                <span className="text-white font-medium">{sponsor.contactPersonName}</span>
                            </div>
                            <div className="py-3 break-all">
                                <span className="block text-white/40 mb-1">Contact Email</span>
                                <span className="text-white font-medium">{sponsor.contactEmail}</span>
                            </div>
                            <div className="py-3 break-all">
                                <span className="block text-white/40 mb-1">Contact Phone</span>
                                <span className="text-white font-medium">{sponsor.contactPhone || 'N/A'}</span>
                            </div>
                            <div className="pt-3 break-all">
                                <span className="block text-white/40 mb-1">Headquarters</span>
                                <span className="text-white font-medium">{sponsor.headquartersCountry}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Governance & Allocations Preview */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-impact-gold" />
                            Contract Lifecycle
                        </h3>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-black/20 rounded-xl border border-white/5">
                            <div>
                                <span className="block text-xs text-white/40 uppercase tracking-wider mb-2">Start Date</span>
                                <span className="text-lg font-mono text-white/90">
                                    {new Date(sponsor.contractStartDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs text-white/40 uppercase tracking-wider mb-2">End Date</span>
                                <span className="text-lg font-mono text-white/90">
                                    {sponsor.contractEndDate ? new Date(sponsor.contractEndDate).toLocaleDateString() : 'Indefinite'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-heading font-bold text-white flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-400" />
                                Recent Allocations
                            </h3>
                            <Link
                                href={`/admin/corporate/${sponsor.id}/allocations`}
                                className="text-xs font-medium text-trust-blue hover:text-blue-400"
                            >
                                View All Map
                            </Link>
                        </div>

                        {sponsor.allocations.length === 0 ? (
                            <div className="text-center p-8 border border-dashed border-white/10 rounded-xl">
                                <p className="text-white/50 text-sm">No children allocated yet.</p>
                                <Link href={`/admin/corporate/${sponsor.id}/allocations`} className="text-trust-blue text-sm font-medium mt-2 inline-block">
                                    Run Allocation Engine
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {sponsor.allocations.slice(0, 5).map((allocation) => (
                                    <div key={allocation.id} className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
                                        <div>
                                            <span className="text-sm font-medium text-white">{allocation.registryChild.displayName}</span>
                                            <div className="text-xs text-white/40 mt-0.5">{allocation.registryChild.region}</div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 text-[10px] font-medium text-green-400 border border-green-500/20">
                                                <CheckCircle2 className="w-3 h-3" /> OPEN ALLOCATION
                                            </span>
                                            <span className="text-[10px] text-white/30 font-mono">
                                                {new Date(allocation.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
