import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { getFaqs } from "@/lib/services/contentService";
import { Metadata } from "next";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ShieldCheck, Mail, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Building Trust Through Transparency - ${settings.organizationName}`,
        description: `Everything you need to know about child sponsorship, donation allocation, transparency, and verified educational reports.`,
    };
}

export default async function FAQPage() {
    const faqs = await getFaqs();

    return (
        <main className="min-h-screen bg-warm-bg pb-20">
            {/* 1. Shorter & Warm Hero Header */}
            <section className="bg-cinematic-dark text-white pt-32 pb-16 relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-trust-blue/10 mix-blend-overlay" />
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-impact-gold/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    {/* Emotional Trust Pill */}
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-white/90 mb-5 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-impact-gold" />
                        Questions are part of trust. We&apos;re happy to answer every one.
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-4 text-white">
                        Building Trust Through Transparency.
                    </h1>
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto font-body">
                        Everything you need to know about sponsorship, donations, transparency, and how we support every child&apos;s educational journey.
                    </p>
                </div>
            </section>

            {/* 2. Main FAQs Container */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                
                {/* Transparency Operational Timestamp Banner */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs mb-8">
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Every answer on this page reflects our current operational policies.</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-trust-blue bg-blue-50 px-3 py-1 rounded-full shrink-0">
                        Last reviewed: July 2026
                    </span>
                </div>

                {/* Categorized FAQs with Live Search */}
                <FAQAccordion items={faqs} />

                {/* 3. Still Have a Question? Bottom Section */}
                <div className="mt-16 bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm text-center max-w-3xl mx-auto">
                    <div className="w-12 h-12 bg-blue-50 text-trust-blue rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                        <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-cinematic-dark mb-2">
                        Still Have a Question?
                    </h3>
                    <p className="text-sm text-gray-600 max-w-md mx-auto mb-6 leading-relaxed font-body">
                        Didn&apos;t find what you&apos;re looking for? Every inquiry is reviewed personally by a real member of our team.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#fdc700] hover:bg-[#fdc700]/90 text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition-all text-sm"
                        >
                            Contact Us <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="mailto:management@onedollaronechild.org"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-cinematic-dark font-bold px-6 py-3 rounded-xl border border-gray-200 text-sm transition-all"
                        >
                            📧 management@onedollaronechild.org
                        </a>
                    </div>
                </div>

            </section>
        </main>
    );
}
