import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, ShieldAlert, AlertTriangle } from "lucide-react";
import { updateRegistryChild } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditChildPage({
    params
}: {
    params: Promise<{ childId: string }>
}) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") return null;

    const { childId } = await params;

    const child = await prisma.registryChild.findUnique({
        where: {
            id: childId,
            deletedAt: null,
            isArchived: false,
        }
    });

    if (!child) return notFound();

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Link href="/admin/children" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Edit Child Record</h1>
                    <p className="text-white/60">Update isolated CMS profile for <strong className="text-white">{child.displayName}</strong></p>
                </div>
            </div>

            <form action={updateRegistryChild} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                <input type="hidden" name="id" value={child.id} />

                {/* Core Demographics */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-impact-gold border-b border-white/10 pb-2">Core Demographics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Display Name</label>
                            <input type="text" name="displayName" defaultValue={child.displayName} required className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Age</label>
                            <input type="number" name="age" defaultValue={child.age} required min="0" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Region / Location</label>
                            <input type="text" name="region" defaultValue={child.region} required className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Education Level</label>
                            <input type="text" name="educationLevel" defaultValue={child.educationLevel} required className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                    </div>
                </div>

                {/* Sponsorship Logistics */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-bold text-impact-gold border-b border-white/10 pb-2">Sponsorship Logistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Monthly Need ($)</label>
                            <input type="number" name="sponsorshipNeededMonthly" defaultValue={Number(child.sponsorshipNeededMonthly)} required min="1" step="0.01" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Sponsors Capacity (maxSponsors)</label>
                            <input type="number" name="maxSponsors" defaultValue={child.maxSponsors} required min="1" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                            <p className="text-xs text-white/40">Lowering this below active sponsor count will cause capacity warnings.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Status</label>
                            <select name="status" defaultValue={child.status} className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue">
                                <option value="WAITING">WAITING</option>
                                <option value="SPONSORED">SPONSORED</option>
                                <option value="GRADUATED">GRADUATED</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Avatar Illustration URL</label>
                            <input type="url" name="avatarIllustrationUrl" defaultValue={child.avatarIllustrationUrl || ""} placeholder="https://..." className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue" />
                        </div>
                    </div>
                </div>

                {/* Compliance & Safeguarding */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-bold text-impact-gold border-b border-white/10 pb-2">Compliance & Safeguarding Audit</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Safeguarding Review Status <span className="text-red-400">*</span></label>
                            <select name="safeguardingReviewStatus" defaultValue={child.safeguardingReviewStatus} required className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue">
                                <option value="PENDING">PENDING (Unverified)</option>
                                <option value="VERIFIED">VERIFIED (Consent Validated)</option>
                                <option value="FLAGGED">FLAGGED (Compliance Issue)</option>
                            </select>
                            {child.safeguardingReviewStatus === "PENDING" && (
                                <p className="text-xs text-impact-gold flex items-center gap-1 mt-1">
                                    <AlertTriangle className="w-3 h-3" /> Requires manual review of consent forms.
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Privacy Mode</label>
                            <select name="privacyMode" defaultValue={child.privacyMode} className="w-full bg-cinematic-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue">
                                <option value="PUBLIC">PUBLIC (General Audience)</option>
                                <option value="STRICT">STRICT (Face Masked / Alias Only)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2 pt-2">
                        <label className="text-sm font-medium text-white/70">Internal Case Notes</label>
                        <textarea name="caseNotes" defaultValue={child.caseNotes || ""} rows={4} className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue resize-none"></textarea>
                        <p className="text-xs text-white/40">These notes are strictly confidential and will never be serialized to the frontend.</p>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                    <p className="text-xs text-white/30 hidden md:block">
                        Added: {new Date(child.createdAt).toLocaleDateString()}
                    </p>
                    <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-trust-blue hover:bg-trust-blue/90 text-white rounded-xl font-bold transition-colors">
                        <Save className="w-5 h-5" />
                        Save Changes & Log Audit
                    </button>
                </div>
            </form>
        </div>
    );
}
