"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function LandingCTASection({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, ctas } = meta;

    return (
        <section className="relative py-28 md:py-40 bg-cinematic-dark text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/placeholders/hero-new.jpg"
                    alt="Conclusion"
                    fill
                    className="object-cover opacity-30 mix-blend-overlay transition-transform duration-[20s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/80 to-cinematic-dark/40" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="w-16 h-px bg-impact-gold mx-auto mb-10 animate-fade-in-up" />
                
                {heading && (
                    <h2 className="text-5xl md:text-7xl font-heading font-extrabold mb-8 tracking-tight animate-fade-in-up delay-100 scale-95">
                        {heading}
                    </h2>
                )}
                
                <p className="text-xl md:text-2xl font-body mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200 scale-95">
                    {description}
                </p>

                {ctas && ctas.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-300 scale-95">
                        {ctas.map((cta: any, idx: number) => (
                            <Link
                                key={idx}
                                href={cta.href}
                                className={`group px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                                    cta.variant === 'primary' 
                                    ? 'bg-impact-gold hover:bg-yellow-400 text-cinematic-dark shadow-[0_0_50px_rgba(253,199,0,0.4)] hover:-translate-y-2'
                                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md hover:-translate-y-2'
                                }`}
                            >
                                {cta.label}
                                {cta.variant === 'primary' && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
