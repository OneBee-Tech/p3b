

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialHero({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, secondaryDescription, backgroundImage, ctas, readingTime, badge, breadcrumb } = meta;

    return (
        <section className="relative bg-cinematic-dark text-white flex flex-col justify-center overflow-hidden pt-12 md:pt-16 pb-[3%]">
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage?.src || backgroundImage}
                        alt={backgroundImage?.alt || "Hero background"}
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover opacity-60"
                    />
                    {/* Enhanced Gradient Overlay matching site-wide HeroAcquisition */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cinematic-dark via-cinematic-dark/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-transparent to-cinematic-dark/30" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20 md:pt-24 pb-4">
                <div className="max-w-4xl text-left">
                    
                    {badge && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider text-impact-gold uppercase mb-5 animate-fade-in-up">
                            {badge}
                        </div>
                    )}

                    {heading && (
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-5 tracking-tight leading-[1.1] animate-fade-in-up delay-100 drop-shadow-lg">
                            {heading}
                        </h1>
                    )}
                    
                    {description && (
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-body mb-5 animate-fade-in-up delay-200 max-w-3xl drop-shadow-md">
                            {description}
                        </p>
                    )}
                    
                    {secondaryDescription && (
                        <p className="text-base md:text-lg text-white/70 leading-relaxed font-body mb-7 animate-fade-in-up delay-300 max-w-2xl">
                            {secondaryDescription}
                        </p>
                    )}

                    {ctas && ctas.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
                            {ctas.map((cta: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={cta.href}
                                    className={`group px-7 py-4.5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
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
            
        </section>
    );
}
