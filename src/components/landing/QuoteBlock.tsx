"use client";

import { Quote } from "lucide-react";

export function QuoteBlock({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { quote } = meta;

    if (!quote || !quote.text) return null;

    const { text, author, role } = quote;

    return (
        <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
            {/* Subtle decorative quote mark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <Quote className="w-96 h-96 text-cinematic-dark" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <Quote className="w-12 h-12 text-impact-gold mx-auto mb-8 opacity-80" />
                
                <blockquote className="text-2xl md:text-4xl font-body font-medium text-cinematic-dark leading-relaxed mb-12 animate-fade-in-up whitespace-pre-line">
                    “{text}”
                </blockquote>

                {(author || role) && (
                    <div className="animate-fade-in-up delay-100 flex flex-col items-center">
                        <div className="w-16 h-px bg-gray-300 mb-6" />
                        
                        {/* Handwritten style signature */}
                        {author && (
                            <div className="font-heading italic font-bold text-3xl text-gray-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                {author}
                            </div>
                        )}
                        
                        {role && (
                            <div className="text-trust-blue text-sm font-bold uppercase tracking-widest">
                                {role}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
