"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Heart } from "lucide-react";
import Image from "next/image";

export function HeroAcquisition() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-cinematic-dark">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop"
                    alt="Children learning together in a supportive community environment"
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
                    <span className="text-sm font-bold tracking-wide uppercase">Community-First Funding</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight mb-8 leading-tight drop-shadow-2xl">
                    One Dollar.<br />
                    <span className="text-impact-gold">One Child.</span><br />
                    One Future.
                </h1>

                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-body">
                    We don’t sponsor isolated individuals. We fund entire ecosystems—providing the tuitions, infrastructure, and supplies needed to transform a community permanently.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/programs"
                        aria-label="Hero CTA: Sponsor a Future"
                        data-tracking="hero-cta-programs"
                        className="group w-full sm:w-auto bg-impact-gold hover:bg-yellow-400 text-cinematic-dark px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-impact-gold/20 hover:-translate-y-1"
                    >
                        Sponsor a Future
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/checkout?type=general"
                        aria-label="Hero CTA: Give Where Needed Most"
                        data-tracking="HERO_ONETIME"
                        className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                        <Heart className="w-5 h-5 fill-current opacity-70" />
                        Give Where Needed Most
                    </Link>
                </div>
            </div>
        </section>
    );
}
