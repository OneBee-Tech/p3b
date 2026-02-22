"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LandingCTASection() {
    return (
        <section className="bg-cinematic-dark py-24 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-trust-blue/5" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-impact-gold/10 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-trust-blue/10 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
                    Ready to change a child's life?
                </h2>
                <p className="text-xl text-white/80 mb-10 leading-relaxed font-body">
                    Join a collective of sponsors providing the education, supplies, and resources needed to break the cycle of poverty permanently. Your gift will support children with the most urgent needs.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/programs"
                        className="group w-full sm:w-auto bg-impact-gold hover:bg-yellow-400 text-cinematic-dark px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-impact-gold/20 hover:-translate-y-1"
                    >
                        Sponsor a Child
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/checkout?type=general"
                        className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                        Give One-Time Gift
                    </Link>
                </div>
            </div>
        </section>
    );
}
