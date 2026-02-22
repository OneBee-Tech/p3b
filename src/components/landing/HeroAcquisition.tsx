"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Heart } from "lucide-react";
import Image from "next/image";

export function HeroAcquisition() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cinematic-dark">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop"
                    alt="Representation of a sponsored child focusing on education"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay blur-[2px]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/90 to-cinematic-dark/20" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
                {/* Eyebrow Label */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-trust-blue/10 border border-trust-blue/20 text-trust-blue backdrop-blur-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-trust-blue animate-pulse" />
                    <span className="text-sm font-bold tracking-wide uppercase">Child First Sponsorship</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
                    Sponsor a Child's Future<br />
                    <span className="text-impact-gold">for Just $1 a Day</span>
                </h1>



                {/* Subheadline */}
                <p className="text-xl md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-body">
                    Even one dollar a day can provide education, supplies, and opportunity to a child in need.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/programs"
                        aria-label="Hero CTA: Sponsor a Child"
                        data-tracking="hero-cta-programs"
                        className="group w-full sm:w-auto bg-impact-gold hover:bg-yellow-400 text-cinematic-dark px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-impact-gold/20 hover:-translate-y-1"
                    >
                        Sponsor a Child
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/checkout?type=general"
                        aria-label="Hero CTA: Give One-Time Gift"
                        data-tracking="HERO_ONETIME"
                        className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                        <Heart className="w-5 h-5 fill-current opacity-70" />
                        Give One-Time Gift
                    </Link>
                </div>
            </div>
        </section>
    );
}
