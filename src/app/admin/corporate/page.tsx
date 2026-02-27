import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ShieldCheck, Plus, Building2, Activity, MoreVertical, Building } from "lucide-react";
import Link from "next/link";
import { getCorporateSponsors } from "./actions";

export const metadata: Metadata = {
    title: "Corporate Sponsors | NGO Admin",
    description: "CSR and Institutional Sponsorship Management",
};

export default async function CorporateSponsorsPage() {
    const session = await auth();

    // Re-verify Access
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    const sponsors = await getCorporateSponsors();

    const totalActive = sponsors.filter(s => s.status === "ACTIVE").length;
    const totalAllocations = sponsors.reduce((acc, s) => acc + s._count.allocations, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-impact-gold" />
                        Corporate & CSR Sponsors
                    </h1>
                    <p className="text-white/60 mt-2">Manage institutional partnerships, funding pools, and bulk child allocations.</p>
                </div>

                <Link
                    href="/admin/corporate/new"
                    className="inline-flex items-center gap-2 bg-trust-blue hover:bg-trust-blue/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors border border-trust-blue/20 whitespace-nowrap"
                >
                    <Plus className="w-5 h-5" />
                    Onboard Corporate Sponsor
                </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-white/50 mb-2">
                        <Building2 className="w-5 h-5" />
                        <h3 className="font-medium text-sm">Active Sponsors</h3>
                    </div>
                    <p className="text-3xl font-heading font-bold text-white">{totalActive}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-white/50 mb-2">
                        <Activity className="w-5 h-5" />
                        <h3 className="font-medium text-sm">Total Allocations</h3>
                    </div>
                    <p className="text-3xl font-heading font-bold text-white">{totalAllocations}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 text-white/50 mb-2">
                        <ShieldCheck className="w-5 h-5" />
                        <h3 className="font-medium text-sm">Funding Model</h3>
                    </div>
                    <p className="text-lg font-heading font-bold text-white leading-tight">Institutional<br />Governance Active</p>
                </div>
            </div>

            {/* List */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-heading font-bold text-white">Institutional Partners</h2>
                </div>

                {sponsors.length === 0 ? (
                    <div className="p-12 text-center text-white/50">
                        <Building className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium">No corporate sponsors found</p>
                        <p className="text-sm mt-1">Onboard your first CSR partner to unlock bulk funding tools.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-xs uppercase text-white/50 font-medium">
                                    <th className="px-6 py-4">Organization</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Funding Model</th>
                                    <th className="px-6 py-4">Status & Capacity</th>
                                    <th className="px-6 py-4">Allocated</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm text-white/80">
                                {sponsors.map((sponsor) => (
                                    <tr key={sponsor.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{sponsor.organizationName}</div>
                                            <div className="text-xs text-white/50 mt-1">{sponsor.headquartersCountry}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-white">{sponsor.contactPersonName}</div>
                                            <div className="text-xs text-white/50">{sponsor.contactEmail}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/10 text-white/90">
                                                {sponsor.fundingModel.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`w-2 h-2 rounded-full ${sponsor.status === 'ACTIVE' ? 'bg-green-500' :
                                                        sponsor.status === 'PAUSED' ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}></span>
                                                <span className="text-xs font-medium">{sponsor.status}</span>
                                            </div>
                                            <div className="text-xs text-white/50">Cap: {sponsor.sponsorshipCapacity} slots</div>
                                        </td>
                                        <td className="px-6 py-4 font-mono">
                                            {sponsor._count.allocations} / {sponsor.sponsorshipCapacity}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/corporate/${sponsor.id}`}
                                                className="text-impact-gold hover:text-yellow-300 font-medium text-xs border border-impact-gold/30 hover:border-impact-gold/60 px-3 py-1.5 rounded transition-all"
                                            >
                                                Manage
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
