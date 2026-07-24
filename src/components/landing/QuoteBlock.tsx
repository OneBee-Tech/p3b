"use client";

import { Quote } from "lucide-react";

export function QuoteBlock({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { quote } = meta;
    const theme = layoutConfig?.theme || 'white';

    if (!quote || !quote.text) return null;

    const { text, author, role } = quote;

    const bgClasses = {
        dark: 'bg-cinematic-dark text-white',
        white: 'bg-white text-gray-900',
        light: 'bg-gray-50 text-gray-900',
        neutral: 'bg-gray-100 text-gray-900'
    }[theme as 'dark'|'white'|'light'|'neutral'] || 'bg-white text-gray-900';

    const textClass = theme === 'dark' ? 'text-white' : 'text-cinematic-dark';
    const quoteMarkColor = theme === 'dark' ? 'text-white/5' : 'text-cinematic-dark/5';

    return (
        <section className={`py-40 md:py-56 relative overflow-hidden ${bgClasses}`}>
            {/* Subtle decorative quote mark */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${quoteMarkColor}`}>
                <Quote className="w-[500px] h-[500px] md:w-[800px] md:h-[800px]" strokeWidth={0.5} />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <Quote className="w-16 h-16 text-impact-gold mx-auto mb-12 opacity-90 animate-fade-in-up" />
                
                <blockquote className={`text-3xl md:text-5xl font-heading font-medium ${textClass} leading-[1.4] mb-16 animate-fade-in-up delay-100 whitespace-pre-line`} style={{ fontFamily: 'Georgia, serif' }}>
                    “{text}”
                </blockquote>

                {(author || role) && (
                    <div className="animate-fade-in-up delay-200 flex flex-col items-center">
                        <div className="w-24 h-px bg-impact-gold/50 mb-8" />
                        
                        {/* Handwritten style signature */}
                        {author && (
                            <div className={`font-heading italic font-bold text-4xl mb-3 ${textClass}`} style={{ fontFamily: 'Georgia, serif' }}>
                                {author}
                            </div>
                        )}
                        
                        {role && (
                            <div className="text-impact-gold text-sm font-bold uppercase tracking-widest">
                                {role}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
