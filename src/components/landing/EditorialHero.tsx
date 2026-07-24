"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialHero({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, backgroundImage, ctas, readingTime, badge, breadcrumb } = meta;

    return (
        <section className="relative bg-cinematic-dark text-white min-h-[85vh] flex items-center overflow-hidden">
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage?.src || backgroundImage}
                        alt={backgroundImage?.alt || "Hero background"}
                        fill
                        priority
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cinematic-dark via-cinematic-dark/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-transparent to-cinematic-dark/30" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
                <div className="max-w-3xl text-left">
                    
                    {/* Editorial Top Bar (Breadcrumb / Reading Time) */}
                    {(breadcrumb || readingTime || badge) && (
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/70 mb-8 animate-fade-in-up">
                            {breadcrumb && <span>{breadcrumb}</span>}
                            {breadcrumb && (readingTime || badge) && <span className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                            {readingTime && <span className="flex items-center gap-1">⏱️ {readingTime}</span>}
                            {readingTime && badge && <span className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                            {badge && <span className="bg-impact-gold text-cinematic-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{badge}</span>}
                        </div>
                    )}

                    {heading && (
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-8 tracking-tight leading-[1.1] animate-fade-in-up">
                            {heading}
                        </h1>
                    )}
                    
                    {description && (
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-body mb-12 animate-fade-in-up delay-100 max-w-2xl drop-shadow-md">
                            {description}
                        </p>
                    )}

                    {ctas && ctas.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                            {ctas.map((cta: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={cta.href}
                                    className={`group px-8 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                        cta.variant === 'primary' 
                                        ? 'bg-impact-gold hover:bg-yellow-400 text-cinematic-dark shadow-[0_0_40px_rgba(253,199,0,0.3)] hover:-translate-y-1'
                                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm'
                                    }`}
                                >
                                    {cta.label}
                                    {cta.variant === 'primary' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
