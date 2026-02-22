"use client";

import Link from "next/link";
import { BookOpen, MapPin, Pickaxe, ArrowRight } from "lucide-react";

export function SponsorshipImpactTiers() {
    return (
        <section className="bg-warm-bg py-24 border-b border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-trust-blue/5 rounded-l-full blur-3xl opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-heading font-bold text-cinematic-dark mb-6">Impact Participation Layers</h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-body">
                        Choose how you want to support a child's future. Your sponsorship tier defines your direct impact. Currency equivalents may vary by donor region and payment processor.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Tier 1 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group flex flex-col">
                        <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-7 h-7 text-trust-blue" />
                        </div>
                        <h3 className="text-2xl font-bold text-cinematic-dark mb-2">Daily Impact</h3>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-4xl font-bold text-cinematic-dark">$1</span>
                            <span className="text-gray-500 font-medium">/ day</span>
                        </div>
                        <p className="text-sm font-bold text-impact-gold mb-6 uppercase tracking-wider">Provides daily essentials & education.</p>
                        <p className="text-sm text-gray-400 mb-6 italic">Less than a cup of coffee.</p>

                        <ul className="space-y-4 mb-8 text-gray-600 flex-grow">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-trust-blue" />
                                Provides daily essentials & learning materials.
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-trust-blue" />
                                Access to monthly impact snapshots.
                            </li>
                        </ul>
                        <Link
                            href="/programs"
                            className="block w-full text-center py-3 rounded-xl border-2 border-trust-blue text-trust-blue font-bold hover:bg-trust-blue hover:text-white transition-colors"
                        >
                            Select Plan
                        </Link>
                    </div>

                    {/* Tier 2 */}
                    <div className="bg-cinematic-dark rounded-2xl p-8 border border-cinematic-dark shadow-xl relative transform md:-translate-y-4 transition-all duration-300 hover:-translate-y-6 flex flex-col">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-impact-gold text-cinematic-dark text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                            Most Selected
                        </div>
                        <div className="bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                            <MapPin className="w-7 h-7 text-impact-gold" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Monthly Guardian</h3>
                        <div className="flex items-baseline gap-1 mb-2 text-white">
                            <span className="text-4xl font-bold">$30</span>
                            <span className="text-white/60 font-medium">/ month</span>
                        </div>
                        <p className="text-sm text-white/50 mb-6 italic">Supports a child's full learning cycle.</p>
                        <ul className="space-y-4 mb-8 text-white/80 flex-grow">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-impact-gold" />
                                Covers tuition & school supplies.
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-impact-gold" />
                                Supports child safeguarding & wellbeing services.
                            </li>
                        </ul>
                        <Link
                            href="/programs"
                            className="block w-full text-center py-3 rounded-xl bg-impact-gold text-cinematic-dark font-bold hover:bg-yellow-400 transition-colors shadow-lg shadow-impact-gold/20"
                        >
                            Select Plan
                        </Link>
                    </div>

                    {/* Tier 3 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group flex flex-col">
                        <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Pickaxe className="w-7 h-7 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-cinematic-dark mb-2">Annual Patron</h3>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-4xl font-bold text-cinematic-dark">$365</span>
                            <span className="text-gray-500 font-medium">/ year</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-6 italic">Equivalent to sponsoring a full academic year.</p>
                        <ul className="space-y-4 mb-8 text-gray-600 flex-grow">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                Funds full academic year for one child.
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                Provides comprehensive medical & learning support.
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                Full transparency with utilization reports.
                            </li>
                        </ul>
                        <Link
                            href="/programs"
                            className="block w-full text-center py-3 rounded-xl border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                            Select Plan
                        </Link>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/checkout?type=general" className="text-gray-500 hover:text-trust-blue font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-trust-blue transition-all">
                        Want to make a single contribution? Give a one-time gift here.
                    </Link>
                </div>
            </div>
        </section>
    );
}
