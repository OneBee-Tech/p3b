"use client";

import { CheckCircle2, HeartHandshake, ShieldCheck, Star, Lock, Clock, Heart, FileText } from "lucide-react";

const resolveIcon = (name: string) => {
    switch (name) {
        case 'HeartHandshake':
        case 'UserHeart': return HeartHandshake;
        case 'ShieldCheck': return ShieldCheck;
        case 'CheckCircle': return CheckCircle2;
        case 'Star': return Star;
        case 'Lock': return Lock;
        case 'Clock': return Clock;
        case 'Heart': return Heart;
        case 'FileText': return FileText;
        default: return Star;
    }
}

export function ContentGrid({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, items } = meta;
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

    return (
        <section className={`py-32 md:py-40 overflow-hidden ${bgClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {(heading || description) && (
                    <div className="text-center mb-20 animate-fade-in-up">
                        {heading && <h2 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 ${textClass}`}>{heading}</h2>}
                        {description && <p className={`text-xl md:text-2xl font-body max-w-2xl mx-auto ${textMutedClass}`}>{description}</p>}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item: any, idx: number) => {
                        const Icon = resolveIcon(item.icon);
                        return (
                            <div 
                                key={idx} 
                                className={`${cardBgClass} rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-impact-gold/10 flex items-center justify-center mb-8 group-hover:bg-impact-gold transition-colors duration-500">
                                    <Icon className="w-8 h-8 text-impact-gold group-hover:text-cinematic-dark transition-colors duration-500" />
                                </div>
                                <h3 className={`text-2xl font-bold font-heading mb-4 ${textClass}`}>{item.title}</h3>
                                {item.description && (
                                    <p className={`text-lg leading-relaxed font-body ${textMutedClass}`}>{item.description}</p>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
