"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export function TrustCards({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, items, ctas } = meta;

    return (
        <section className="py-24 bg-cinematic-dark text-white border-t border-white/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {heading && (
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 tracking-tight animate-fade-in-up">
                        {heading}
                    </h2>
                )}
                
                {description && (
                    <p className="text-lg text-white/70 font-body mb-12 max-w-2xl mx-auto animate-fade-in-up delay-100">
                        {description}
                    </p>
                )}

                {items && Array.isArray(items) && items.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {items.map((item: any, idx: number) => {
                            const Icon = item.icon === 'ShieldCheck' ? ShieldCheck : item.icon === 'FileText' ? FileText : CheckCircle2;
                            return (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: `${(idx+2) * 100}ms` }}>
                                    <Icon className="w-10 h-10 text-impact-gold mb-4" />
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    {item.description && (
                                        <p className="text-sm text-white/60 mb-3">{item.description}</p>
                                    )}
                                    {/* Conditional specific fields like registration numbers */}
                                    {item.value && (
                                        <div className="mt-auto pt-3 border-t border-white/10 text-impact-gold font-mono text-sm font-bold">
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
                                className={`group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                                    cta.variant === 'primary' 
                                    ? 'bg-impact-gold text-cinematic-dark hover:bg-yellow-400 hover:-translate-y-1'
                                    : 'bg-white/10 text-white hover:bg-white/20 hover:-translate-y-1'
                                }`}
                            >
                                {cta.label}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
