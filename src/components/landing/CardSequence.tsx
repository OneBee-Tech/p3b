"use client";

import { Check } from "lucide-react";

export function CardSequence({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { heading, items, style } = meta;
    const theme = layoutConfig?.theme || 'white';

    if (!items || !Array.isArray(items)) return null;

    const bgClasses = {
        dark: 'bg-cinematic-dark text-white',
        white: 'bg-white text-gray-900',
        light: 'bg-gray-50 text-gray-900',
        neutral: 'bg-gray-100 text-gray-900'
    }[theme as 'dark'|'white'|'light'|'neutral'] || 'bg-white text-gray-900';

    const textClass = theme === 'dark' ? 'text-white' : 'text-cinematic-dark';
    const textMutedClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const cardBgClass = theme === 'dark' ? 'bg-white/5 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-white border border-gray-100 shadow-xl';

    // Purpose section was converted to a vertical milestone layout
    const isChecklist = style === 'checklist' || meta?.heading === 'Purpose';
    const isEditorial = style === 'editorial';

    return (
        <section className={`py-32 md:py-40 overflow-hidden ${bgClasses}`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isChecklist ? 'flex flex-col md:flex-row gap-12 lg:gap-24 items-center max-w-6xl' : ''}`}>
                
                {heading && (
                    <div className={`${isChecklist ? 'w-full md:w-1/3 text-left' : 'text-center mb-20'} animate-fade-in-up`}>
                        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight ${textClass}`}>{heading}</h2>
                        {meta.description && (
                            <p className={`mt-6 text-xl md:text-2xl font-body max-w-2xl mx-auto ${textMutedClass}`}>{meta.description}</p>
                        )}
                    </div>
                )}

                <div className={`${isChecklist ? 'w-full md:w-2/3 flex flex-col gap-6' : isEditorial ? 'grid md:grid-cols-3 gap-6 lg:gap-8' : `grid md:grid-cols-${items.length <= 3 ? items.length : 3} gap-8 lg:gap-12`}`}>
                    {items.map((item: any, idx: number) => (
                        <div 
                            key={idx} 
                            className={`${isChecklist ? 'flex flex-row items-start gap-6 p-6 md:p-8' : isEditorial ? 'flex flex-col items-start p-8 lg:p-10 bg-transparent border-t-2 border-impact-gold/50 rounded-none shadow-none hover:translate-y-0 hover:bg-black/5' : `flex flex-col items-start p-10 lg:p-12 ${cardBgClass} rounded-2xl hover:-translate-y-2`} transition-all duration-500 animate-fade-in-up group`} 
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            {isChecklist ? (
                                <div className="mt-1 bg-impact-gold rounded-full p-1.5 shadow-md flex-shrink-0">
                                    <Check className="w-5 h-5 text-cinematic-dark" strokeWidth={3} />
                                </div>
                            ) : (
                                <div className="text-impact-gold font-mono font-bold text-lg mb-6 tracking-widest border border-impact-gold/20 px-3 py-1 rounded-full group-hover:bg-impact-gold group-hover:text-cinematic-dark transition-colors duration-300">0{idx + 1}</div>
                            )}
                            <div>
                                <h3 className={`text-2xl font-bold mb-3 ${textClass}`}>{item.title}</h3>
                                {item.description && (
                                    <p className={`text-lg leading-relaxed ${textMutedClass} font-body`}>{item.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {meta.footerText && (
                    <div className="mt-20 text-center animate-fade-in-up delay-500">
                        <p className={`text-xl md:text-2xl font-heading font-medium italic ${textClass} max-w-4xl mx-auto leading-relaxed`}>
                            {meta.footerText}
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}
