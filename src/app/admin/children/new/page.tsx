import { auth } from "@/auth";
import Link from "next/link";
import { ArrowLeft, Save, ShieldAlert } from "lucide-react";
import { createRegistryChild } from "../actions";

export default async function AddChildPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") return null;

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Link href="/admin/children" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Ingest Child Record</h1>
                    <p className="text-white/60">Create a new isolated child profile for the CMS registry.</p>
                </div>
            </div>

            <form action={createRegistryChild} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">

                {/* Core Demographics */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-impact-gold border-b border-white/10 pb-2">Core Demographics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Display Name</label>
                            <input type="text" name="displayName" required className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Age</label>
                            <input type="number" name="age" required min="0" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Region / Location</label>
                            <input type="text" name="region" required className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Education Level</label>
                            <input type="text" name="educationLevel" required placeholder="e.g. 5th Grade" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                    </div>
                </div>

                {/* Sponsorship Logistics */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-bold text-impact-gold border-b border-white/10 pb-2">Sponsorship Logistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Monthly Need ($)</label>
                            <input type="number" name="sponsorshipNeededMonthly" required min="1" step="0.01" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Sponsors Capacity (maxSponsors)</label>
                            <input type="number" name="maxSponsors" required min="1" defaultValue="1" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                            <p className="text-xs text-white/40">Default is 1 sponsor. Increase to enable pooled modular funding.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Status</label>
                            <select name="status" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue">
                                <option value="WAITING">WAITING</option>
                                <option value="SUPPORTED">SUPPORTED</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Avatar Illustration URL (Cloudinary Base)</label>
                            <input type="url" name="avatarIllustrationUrl" placeholder="https://..." className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                            <p className="text-xs text-red-400">Media Governance: DO NOT use base64 strings. URL must point to secure CDN.</p>
                        </div>
                    </div>
                </div>

                {/* Compliance & Safeguarding */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-bold text-impact-gold border-b border-white/10 pb-2">Compliance & Safeguarding</h3>

                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex gap-4">
                        <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-white font-medium mb-2">Notice: A safeguarding review will be automatically triggered upon creation. This profile will remain marked as 'PENDING' for audit until formally verified.</p>

                            <div className="flex items-center gap-3">
                                <input type="checkbox" name="safeguardingConsent" id="safeguardingConsent" value="true" required className="w-4 h-4 cursor-pointer" />
                                <label htmlFor="safeguardingConsent" className="text-sm text-white/80 cursor-pointer">I confirm that all guardian/parental consent forms are physically filed.</label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Privacy Mode</label>
                        <select name="privacyMode" className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue">
                            <option value="PUBLIC">PUBLIC (General Audience)</option>
                            <option value="STRICT">STRICT (Face Masked / Alias Only)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Internal Case Notes</label>
                        <textarea name="caseNotes" rows={4} className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue resize-none"></textarea>
                        <p className="text-xs text-white/40">These notes are strictly confidential and will never be serialized to the frontend.</p>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-impact-gold hover:bg-impact-gold/90 text-cinematic-dark rounded-xl font-bold transition-colors">
                        <Save className="w-5 h-5" />
                        Save & Ingest Record
                    </button>
                </div>
            </form>
        </div>
    );
}
