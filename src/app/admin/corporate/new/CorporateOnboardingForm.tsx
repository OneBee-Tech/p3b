"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCorporateSponsor } from "../actions";
import { Building2, Mail, Phone, Globe, Briefcase, Calendar, CheckCircle2 } from "lucide-react";

export default function CorporateOnboardingForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const data = {
                organizationName: formData.get("organizationName") as string,
                contactPersonName: formData.get("contactPersonName") as string,
                contactEmail: formData.get("contactEmail") as string,
                contactPhone: formData.get("contactPhone") as string || undefined,
                headquartersCountry: formData.get("headquartersCountry") as string,
                fundingModel: formData.get("fundingModel") as "SLOT_BASED" | "POOL_BASED",
                sponsorshipCapacity: parseInt(formData.get("sponsorshipCapacity") as string, 10),
                contractStartDate: new Date(formData.get("contractStartDate") as string),
                contractEndDate: formData.get("contractEndDate") ? new Date(formData.get("contractEndDate") as string) : undefined,
                status: "ACTIVE" as const,
            };

            const result = await createCorporateSponsor(data);

            if (result.success && result.sponsor) {
                router.push(`/admin/corporate/${result.sponsor.id}`);
            } else {
                setError(result.error || "Failed to board partner.");
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm">
                    {error}
                </div>
            )}

            {/* Basic Info */}
            <div className="space-y-4">
                <h2 className="text-xl font-heading font-medium border-b border-white/10 pb-2 text-impact-gold">Organization Details</h2>

                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Organization Name *</label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                        <input
                            type="text"
                            name="organizationName"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-impact-gold/50"
                            placeholder="e.g. Acme Foundation"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Headquarters Country *</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                            <input
                                type="text"
                                name="headquartersCountry"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-impact-gold/50"
                                placeholder="e.g. United Kingdom"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
                <h2 className="text-xl font-heading font-medium border-b border-white/10 pb-2 text-trust-blue">Primary CSR Contact</h2>

                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Contact Person Name *</label>
                    <input
                        type="text"
                        name="contactPersonName"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-trust-blue/50"
                        placeholder="e.g. Sarah Jenkins"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Contact Email *</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                            <input
                                type="email"
                                name="contactEmail"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-trust-blue/50"
                                placeholder="sarah@acme.org"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Contact Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                            <input
                                type="text"
                                name="contactPhone"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-trust-blue/50"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sponsorship Params */}
            <div className="space-y-4">
                <h2 className="text-xl font-heading font-medium border-b border-white/10 pb-2 text-purple-400">Funding Governance</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Funding Model *</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                            <select
                                name="fundingModel"
                                required
                                defaultValue="SLOT_BASED"
                                className="w-full bg-[#131b26] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none"
                            >
                                <option value="SLOT_BASED">Slot-Based (Fixed Number of Children)</option>
                                <option value="POOL_BASED">Pool-Based (Dynamic Funding Distribution)</option>
                            </select>
                        </div>
                        <p className="text-xs text-white/40 mt-1">Dictates how ESG snapshots are aggregated.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Sponsorship Capacity *</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                            <input
                                type="number"
                                name="sponsorshipCapacity"
                                required
                                min="1"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                placeholder="100"
                            />
                        </div>
                        <p className="text-xs text-white/40 mt-1">Maximum number of children limit.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Contract Start Date *</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                            <input
                                type="date"
                                name="contractStartDate"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 [color-scheme:dark]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Contract End Date (Optional)</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-white/30 opacity-50" />
                            <input
                                type="date"
                                name="contractEndDate"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 [color-scheme:dark]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 bg-impact-gold hover:bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Provisioning..." : (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            Create Institutional Profile
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
