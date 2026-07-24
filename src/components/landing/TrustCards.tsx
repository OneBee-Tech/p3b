"use client";

import { ShieldCheck, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function TrustCards({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, items, ctas } = meta;
    const theme = layoutConfig?.theme || 'white';

    const bgClasses = {
        dark: 'bg-cinematic-dark text-white',
        white: 'bg-white text-gray-900',
        light: 'bg-gray-50 text-gray-900',
        neutral: 'bg-gray-100 text-gray-900'
    }[theme as 'dark'|'white'|'light'|'neutral'] || 'bg-white text-gray-900';

    const textClass = theme === 'dark' ? 'text-white' : 'text-cinematic-dark';
    const textMutedClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const cardBgClass = theme === 'dark' ? 'bg-white/5 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-white border border-gray-100 shadow-xl';

    return (
        <section className={`py-32 md:py-40 overflow-hidden ${bgClasses}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {heading && (
                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight animate-fade-in-up ${textClass}`}>
                        {heading}
                    </h2>
                )}
                
                {description && (
                    <p className={`text-xl md:text-2xl font-body mb-16 max-w-2xl mx-auto animate-fade-in-up delay-100 ${textMutedClass}`}>
                        {description}
                    </p>
                )}

                {items && Array.isArray(items) && items.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {items.map((item: any, idx: number) => {
                            const Icon = item.icon === 'ShieldCheck' ? ShieldCheck : item.icon === 'FileText' ? FileText : CheckCircle2;
                            return (
                                <div key={idx} className={`${cardBgClass} rounded-2xl p-10 flex flex-col items-center text-center animate-fade-in-up transition-transform duration-500 hover:-translate-y-2`} style={{ animationDelay: `${(idx+1) * 150}ms` }}>
                                    <Icon className="w-12 h-12 text-impact-gold mb-6" strokeWidth={1.5} />
                                    <h3 className={`text-2xl font-bold font-heading mb-4 ${textClass}`}>{item.title}</h3>
                                    {item.description && (
                                        <p className={`text-lg leading-relaxed font-body mb-6 ${textMutedClass}`}>{item.description}</p>
                                    )}
                                    {/* Conditional specific fields like registration numbers */}
                                    {item.value && (
                                        <div className="mt-auto pt-4 border-t border-impact-gold/30 text-impact-gold font-mono text-sm font-bold tracking-widest w-full">
                                            {item.value}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {ctas && ctas.length > 0 && (
                    <div className="flex justify-center animate-fade-in-up delay-500">
                        {ctas.map((cta: any, idx: number) => (
                            <Link
                                key={idx}
                                href={cta.href}
                                className={`group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                    cta.variant === 'primary' 
                                    ? 'bg-impact-gold text-cinematic-dark hover:bg-yellow-400 hover:-translate-y-1 shadow-[0_0_30px_rgba(253,199,0,0.3)]'
                                    : `bg-transparent border ${theme==='dark' ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-50'} hover:-translate-y-1`
                                }`}
                            >
                                {cta.label}
                                {cta.variant === 'primary' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
