

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialHero({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, secondaryDescription, backgroundImage, ctas, readingTime, badge, breadcrumb, variant } = meta;
    const isTall = variant === 'tall';

    return (
        <section className={`hero-section relative bg-cinematic-dark text-white flex flex-col justify-center overflow-hidden ${isTall ? 'min-h-screen' : ''}`}>
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

            {isTall && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[80vh] bg-impact-gold/5 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
            )}

            <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${isTall ? 'pt-28 pb-8 lg:pt-32 lg:pb-12' : 'pt-20 pb-8 lg:pt-24 lg:pb-12'}`}>
                <div className="max-w-4xl text-left">
                    
                    {badge && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider text-impact-gold uppercase mb-5 animate-fade-in-up">
                            {badge}
                        </div>
                    )}

                    {heading && (
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 tracking-tight leading-[1.1] animate-fade-in-up delay-100 drop-shadow-lg max-w-4xl">
                            {heading}
                        </h1>
                    )}
                    
                    {description && (
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-body mb-8 animate-fade-in-up delay-200 max-w-3xl drop-shadow-md">
                            {description}
                        </p>
                    )}
                    
                    {secondaryDescription && (
                        <p className="text-base md:text-lg text-white/70 leading-relaxed font-body mb-7 animate-fade-in-up delay-300 max-w-2xl">
                            {secondaryDescription}
                        </p>
                    )}

                    {ctas && ctas.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-4 mb-4 animate-fade-in-up delay-400">
                            {ctas.map((cta: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={cta.href}
                                    className={`group px-7 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
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

                    {meta.statistics && meta.statistics.length > 0 && (
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-6 mb-4 animate-fade-in-up delay-400">
                            {meta.statistics.map((stat: any, idx: number) => (
                                <div key={idx} className="flex flex-col">
                                    <span className="text-xl font-bold text-white tracking-tight">{stat.value}</span>
                                    <span className="text-sm font-medium text-impact-gold">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                        {meta.trustStrip && meta.trustStrip.length > 0 && (
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-4 pt-4 border-t border-white/10 animate-fade-in-up delay-500 text-sm font-medium text-white/80">
                                {meta.trustStrip.map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="tracking-wide">{item}</span>
                                        </div>
                                        {idx < meta.trustStrip.length - 1 && (
                                            <span className="mx-4 text-white/20 hidden sm:inline-block">•</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
            </div>
            
        </section>
    );
}
