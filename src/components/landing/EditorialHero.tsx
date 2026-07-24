"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialHero({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, secondaryDescription, backgroundImage, ctas, readingTime, badge, breadcrumb } = meta;

    return (
        <section className="relative bg-cinematic-dark text-white min-h-[90vh] md:h-[95vh] md:min-h-[735px] flex items-center overflow-hidden py-24 md:py-0">
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage?.src || backgroundImage}
                        alt={backgroundImage?.alt || "Hero background"}
                        fill
                        priority
                        className="object-cover object-[center_30%] md:object-[center_20%] opacity-40 md:opacity-55 transition-transform duration-[10s] hover:scale-105"
                    />
                    {/* Mobile: Top-to-bottom dark gradient for 100% text contrast. Desktop: Left-to-right gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cinematic-dark/95 via-cinematic-dark/85 to-cinematic-dark/95 md:bg-gradient-to-r md:from-cinematic-dark/95 md:via-cinematic-dark/70 md:to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-transparent to-black/50 opacity-90" />
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] pointer-events-none" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 sm:pt-36 md:pt-56 md:pb-32">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-8 lg:col-span-7">
                        
                        {heading && (
                            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 sm:mb-8 tracking-tight leading-[1.1] md:leading-[1.05] animate-fade-in-up delay-100">
                                {heading}
                            </h1>
                        )}
                        
                        {description && (
                            <p className="text-lg sm:text-xl md:text-3xl text-white/90 leading-relaxed sm:leading-snug font-body mb-4 sm:mb-6 animate-fade-in-up delay-200 drop-shadow-md">
                                {description}
                            </p>
                        )}
                        
                        {secondaryDescription && (
                            <p className="text-base md:text-lg text-white/70 leading-relaxed font-body mb-8 sm:mb-12 animate-fade-in-up delay-300 max-w-prose">
                                {secondaryDescription}
                            </p>
                        )}

                        {ctas && ctas.length > 0 && (
                            <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up delay-400 mt-12">
                                {ctas.map((cta: any, idx: number) => (
                                    <Link
                                        key={idx}
                                        href={cta.href}
                                        className={`group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                                            cta.variant === 'primary' 
                                            ? 'bg-impact-gold hover:bg-yellow-400 text-cinematic-dark shadow-[0_0_40px_rgba(253,199,0,0.3)] hover:-translate-y-1'
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm hover:-translate-y-1'
                                        }`}
                                    >
                                        {cta.label}
                                        {cta.variant === 'primary' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {meta.trustStrip && meta.trustStrip.length > 0 && (
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-12 animate-fade-in-up delay-500 text-sm font-medium text-white/80">
                                {meta.trustStrip.map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        </section>
    );
}
