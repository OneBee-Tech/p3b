"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function LandingCTASection({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const heading = meta.heading || "You May Forget Where You Spent One Dollar Today.\n\nA Child May Remember Its Impact for the Rest of Their Life.";
    const description = meta.description || "Give one dollar a day. Help a child enter a classroom, receive the materials they need, and continue building their future.";
    const ctas = meta.ctas || [
        { label: "Start Giving $1 a Day", href: "/sponsor", variant: "primary" }
    ];
    // Can default to a placeholder if none provided
    const bgImage = meta.bgImage || "/images/placeholders/hero.jpg"; 

    return (
        <section className="relative py-32 md:py-48 overflow-hidden bg-cinematic-dark flex items-center">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt="Children in a classroom"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-cinematic-dark/50 to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
                <h2 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-8 tracking-tight whitespace-pre-line leading-[1.1] drop-shadow-xl">
                    {heading}
                </h2>
                
                {description && (
                    <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-body whitespace-pre-line drop-shadow-md">
                        {description}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {ctas.map((cta: any, index: number) => {
                        if (cta.variant === 'primary') {
                            return (
                                <Link
                                    key={index}
                                    href={cta.href}
                                    className="group w-full sm:w-auto bg-impact-gold hover:bg-yellow-400 text-cinematic-dark px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(253,199,0,0.3)] hover:-translate-y-1"
                                >
                                    {cta.label}
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            );
                        }
                        return (
                            <Link
                                key={index}
                                href={cta.href}
                                className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                            >
                                {cta.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
