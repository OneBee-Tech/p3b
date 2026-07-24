"use client";

import { ArrowDown } from "lucide-react";

export function ProcessFlow({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, items, flowDirection = 'vertical' } = meta;

    if (!items || !Array.isArray(items)) return null;
    
    const isHorizontal = flowDirection === 'horizontal';

    return (
        <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {(heading || description) && (
                    <div className="mb-16 animate-fade-in-up">
                        {heading && <h2 className="text-3xl md:text-5xl font-heading font-bold text-cinematic-dark mb-6 tracking-tight">{heading}</h2>}
                        {description && <p className="text-lg md:text-xl text-gray-600 font-body max-w-2xl mx-auto">{description}</p>}
                    </div>
                )}

                <div className={`relative flex ${isHorizontal ? 'flex-col md:flex-row items-center justify-center flex-wrap gap-8' : 'flex-col items-center'}`}>
                    {items.map((item: string, idx: number) => (
                        <div key={idx} className={`flex ${isHorizontal ? 'items-center' : 'flex-col items-center'} animate-fade-in-up`} style={{ animationDelay: `${idx * 150}ms` }}>
                            
                            <div className="bg-white border-2 border-trust-blue/20 shadow-md rounded-2xl py-6 px-12 md:px-16 text-xl md:text-2xl font-heading font-bold text-cinematic-dark w-full max-w-md transition-all duration-300 hover:border-impact-gold hover:shadow-xl hover:scale-105">
                                {item}
                            </div>
                            
                            {idx < items.length - 1 && (
                                <div className={`${isHorizontal ? 'w-16 h-16 md:rotate-270 mx-4' : 'h-16'} flex items-center justify-center text-trust-blue/40`}>
                                    <ArrowDown className={`w-8 h-8 ${isHorizontal ? 'md:-rotate-90 animate-pulse' : 'animate-bounce'}`} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
