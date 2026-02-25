import { ShieldCheck, ArrowRight, HeartPulse, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { submitReferral } from "./actions";

export const dynamic = "force-dynamic";

export default async function ReferralIntakePage({
    searchParams
}: {
    searchParams: Promise<{ success?: string }>
}) {
    const resolvedSearchParams = await searchParams;
    if (resolvedSearchParams.success === "true") {
        return (
            <div className="min-h-screen bg-[#0a0f16] flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-white">Referral Ingested</h1>
                    <p className="text-white/60">
                        Thank you for bringing a child in need to our attention. Our field safeguarding team will review this case within 48 to 72 hours.
                    </p>
                    <Link href="/" className="inline-block mt-4 text-trust-blue hover:text-white transition-colors font-bold">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0f16]">
            {/* Header / Hero */}
            <div className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trust-blue/10 rounded-full blur-[100px] opacity-50 mix-blend-screen" />
                </div>

                <div className="relative max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-trust-blue/30 bg-trust-blue/10 backdrop-blur-md">
                        <HeartPulse className="w-4 h-4 text-trust-blue animate-pulse" />
                        <span className="text-sm font-medium text-trust-blue tracking-wide uppercase">Community Intake Engine</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-white mb-6">
                        Nominate a Child <br className="hidden md:block" />
                        <span className="text-impact-gold">for Sponsorship</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                        If you know a child who urgently needs educational sponsorship and intervention, submit their case to our field safeguarding team.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pb-32 relative z-10">
                <form action={submitReferral} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 space-y-8 backdrop-blur-xl">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Your Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Full Name</label>
                                <input type="text" name="referrerName" required className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Email Address</label>
                                <input type="email" name="email" required className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Child Context</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Location / Region</label>
                                <input type="text" name="childLocation" required placeholder="City, Village, or Region" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Current Education Status</label>
                                <input type="text" name="educationStatus" required placeholder="e.g. Dropped out, 4th Grade" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Urgency Level</label>
                                <select name="urgencyLevel" required className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue transition-colors appearance-none">
                                    <option value="LOW">Low - Preventative support needed</option>
                                    <option value="HIGH">High - Immediate risk of dropping out</option>
                                    <option value="CRITICAL">Critical - Completely out of school, facing hardship</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Brief Situation Notes</label>
                                <textarea name="notes" rows={4} required placeholder="Why does this child need immediate sponsorship intervention?" className="w-full bg-cinematic-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-trust-blue transition-colors resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-trust-blue/10 border border-trust-blue/20 rounded-2xl p-4 flex gap-4">
                        <ShieldCheck className="w-6 h-6 text-trust-blue flex-shrink-0" />
                        <div>
                            <p className="text-sm text-white/80">
                                This submission is securely processed and logged for strict safeguarding governance. False claims or spam will be auto-flagged and IP restricted.
                            </p>
                        </div>
                    </div>

                    <button type="submit" className="w-full group relative flex items-center justify-center gap-3 px-8 py-5 bg-impact-gold hover:bg-opacity-90 text-cinematic-dark rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                        Submit Intake Referral
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
    );
}
