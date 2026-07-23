"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, HeartHandshake, FileText, Lock, Heart, PlayCircle } from "lucide-react";

export function HeroAcquisition({ data }: { data?: any }) {
    const heroImage = "/images/placeholders/hero-new.jpg";

    return (
        <section className="relative bg-cinematic-dark text-white flex items-center overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroImage}
                    alt="Children smiling and learning"
                    fill
                    priority
                    className="object-cover opacity-60"
                />
                {/* Enhanced Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-cinematic-dark via-cinematic-dark/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-transparent to-cinematic-dark/30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-4 md:pt-36 md:pb-8">
                <div className="max-w-3xl text-left">
                    <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-white mb-6 tracking-tight leading-[1.1] whitespace-pre-line animate-fade-in-up delay-100 drop-shadow-lg">
                        One Dollar. One Child.<br/>
                        <span className="text-impact-gold">One Future.</span>
                    </h1>

                    <div className="text-lg md:text-xl text-white/90 leading-relaxed font-body mb-10 animate-fade-in-up delay-200 max-w-3xl drop-shadow-md space-y-6">
                        <p>In countries like Canada, quality public education is a blessing many families can rely on. In many underserved communities, children are not given that same safe start.</p>
                        <p>Some children study in damaged, overcrowded government schools with limited materials, irregular teaching, and unsafe conditions. Your $1 a day, shared with others, helps move carefully selected children from low-income families into affordable, quality private schools where they can learn safely, consistently, and with dignity.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up delay-300">
                        <Link
                            href="/sponsor"
                            className="group bg-impact-gold hover:bg-yellow-400 text-cinematic-dark px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(253,199,0,0.3)] hover:-translate-y-1"
                        >
                            <Heart className="w-5 h-5 fill-current" />
                            Give $1 a Day
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="group bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                        >
                            <PlayCircle className="w-5 h-5" />
                            See How It Works
                        </Link>
                    </div>
                </div>

                {/* Trust Indicators Strip */}
                <div className="flex flex-wrap items-center justify-between gap-8 pt-6 border-t border-white/10 animate-fade-in-up delay-400 text-sm font-medium text-white/80 w-full">
                    <div className="flex items-center gap-2">
                        <HeartHandshake className="w-5 h-5 text-emerald-400" />
                        Pooled Donations
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-trust-blue" />
                        Vetted Private Schools
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-slate-300" />
                        Child Safeguarding
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-impact-gold" />
                        6-Month Progress Reports
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-300" />
                        Transparent Reporting
                    </div>
                </div>
            </div>
        </section>
    );
}
