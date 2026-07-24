"use client";

import { ArrowRight } from "lucide-react";

export function CardSequence({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { items, heading } = meta;

    if (!items || !Array.isArray(items)) return null;

    return (
        <section className="py-24 md:py-32 bg-cinematic-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {heading && (
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 tracking-tight animate-fade-in-up">
                        {heading}
                    </h2>
                )}

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-impact-gold/30 to-transparent -translate-y-1/2 z-0" />

                    {items.map((item: any, idx: number) => (
                        <div key={idx} className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-2xl animate-fade-in-up transition-all duration-300 hover:bg-white/10" style={{ animationDelay: `${idx * 150}ms` }}>
                            
                            {/* Sequence Indicator */}
                            <div className="w-12 h-12 rounded-full bg-impact-gold text-cinematic-dark font-bold flex items-center justify-center mb-6 text-xl shadow-[0_0_20px_rgba(253,199,0,0.2)]">
                                {idx + 1}
                            </div>

                            <h3 className="text-2xl font-bold font-heading mb-4 text-white">
                                {item.title}
                            </h3>
                            
                            <p className="text-white/70 leading-relaxed font-body">
                                {item.description}
                            </p>
                            
                            {/* Visual cue for next item on mobile */}
                            {idx < items.length - 1 && (
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:hidden">
                                    <ArrowRight className="w-6 h-6 text-impact-gold rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
