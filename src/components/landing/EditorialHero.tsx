"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialHero({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, secondaryDescription, backgroundImage, ctas, readingTime, badge, breadcrumb } = meta;

    return (
        <section className="relative bg-cinematic-dark text-white h-[95vh] min-h-[735px] flex items-center overflow-hidden">
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage?.src || backgroundImage}
                        alt={backgroundImage?.alt || "Hero background"}
                        fill
                        priority
                        className="object-cover object-center md:object-[center_20%] opacity-55 transition-transform duration-[10s] hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cinematic-dark/90 via-cinematic-dark/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-transparent to-black/40 opacity-80" />
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] pointer-events-none" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-48 pb-24 md:pt-56 md:pb-32">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-8 lg:col-span-7">
                        
                        {heading && (
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 tracking-tight leading-[1.05] animate-fade-in-up delay-100">
                                {heading}
                            </h1>
                        )}
                        
                        {description && (
                            <p className="text-2xl md:text-3xl text-white/90 leading-snug font-body mb-6 animate-fade-in-up delay-200 drop-shadow-md">
                                {description}
                            </p>
                        )}
                        
                        {secondaryDescription && (
                            <p className="text-lg text-white/70 leading-relaxed font-body mb-12 animate-fade-in-up delay-300 max-w-prose">
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
                    </div>
                </div>
            </div>
            
        </section>
    );
}
