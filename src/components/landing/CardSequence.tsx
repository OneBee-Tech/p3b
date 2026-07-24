"use client";

import { 
    Receipt, 
    FileCheck, 
    TrendingUp, 
    MessageSquare, 
    CalendarCheck, 
    Camera, 
    Award, 
    Check, 
    CheckSquare, 
    LineChart, 
    MessageCircle, 
    Calendar, 
    Image as ImageIcon,
    FileText,
    ShieldCheck
} from "lucide-react";
import Image from "next/image";

const resolveIcon = (name: string) => {
    switch (name) {
        case 'Receipt': return Receipt;
        case 'FileCheck': case 'CheckSquare': return FileCheck;
        case 'TrendingUp': case 'LineChart': return TrendingUp;
        case 'MessageSquare': case 'MessageCircle': return MessageSquare;
        case 'CalendarCheck': case 'Calendar': return CalendarCheck;
        case 'Camera': case 'Image': case 'ImageIcon': return Camera;
        case 'Award': return Award;
        case 'ShieldCheck': return ShieldCheck;
        case 'FileText': return FileText;
        default: return Check;
    }
};

export function CardSequence({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, style, footerText } = meta;
    const items = meta.items || meta.cards;
    const theme = layoutConfig?.theme || 'gray-50';

    if (!items || !Array.isArray(items)) return null;

    const bgClasses = {
        dark: 'bg-cinematic-dark text-white',
        white: 'bg-white text-gray-900',
        light: 'bg-gray-50 text-gray-900',
        neutral: 'bg-gray-100 text-gray-900',
        'gray-50': 'bg-gray-50 text-gray-900'
    }[theme as 'dark'|'white'|'light'|'neutral'|'gray-50'] || 'bg-gray-50 text-gray-900';

    const textClass = theme === 'dark' ? 'text-white' : 'text-cinematic-dark';
    const textMutedClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const cardBgClass = theme === 'dark' 
        ? 'bg-white/5 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-impact-gold/40' 
        : 'bg-white border border-gray-200/80 shadow-md hover:shadow-2xl hover:border-impact-gold/50';

    const isChecklist = style === 'checklist' || heading === 'Purpose';

    return (
        <section className={`py-20 sm:py-28 md:py-36 overflow-hidden ${bgClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {heading && (
                    <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 ${textClass}`}>
                            {heading}
                        </h2>
                        {description && (
                            <p className={`text-lg sm:text-xl md:text-2xl font-body max-w-3xl mx-auto ${textMutedClass} leading-relaxed whitespace-pre-line`}>
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid Layout: Single column on mobile, 2 columns on tablet, 3 columns on desktop */}
                <div className={`grid grid-cols-1 ${isChecklist ? 'md:grid-cols-1 max-w-4xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6 lg:gap-8 items-stretch`}>
                    {items.map((item: any, idx: number) => {
                        const IconComponent = item.icon ? resolveIcon(item.icon) : Check;
                        const itemNum = String(idx + 1).padStart(2, '0');

                        return (
                            <div 
                                key={idx} 
                                className={`group flex flex-col justify-between p-6 sm:p-8 ${cardBgClass} rounded-2xl sm:rounded-3xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up relative overflow-hidden`} 
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                {/* Top Badge & Icon Row */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-impact-gold/10 border border-impact-gold/30 flex items-center justify-center text-impact-gold group-hover:bg-impact-gold group-hover:text-cinematic-dark transition-all duration-300 shadow-sm">
                                            <IconComponent className="w-6 h-6" strokeWidth={2} />
                                        </div>
                                        <span className="text-xs font-mono font-bold tracking-widest text-impact-gold/80 bg-impact-gold/10 px-2.5 py-1 rounded-full border border-impact-gold/20">
                                            {itemNum}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className={`text-xl sm:text-2xl font-bold font-heading mb-3 ${textClass} group-hover:text-impact-gold transition-colors`}>
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className={`text-sm sm:text-base leading-relaxed ${textMutedClass} font-body`}>
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                {/* Optional Semantic Image Thumbnail / Placeholder */}
                                {item.image && (
                                    <div className="mt-8 relative h-48 w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                                        <Image 
                                            src={typeof item.image === 'string' ? item.image : item.image.src} 
                                            alt={item.title} 
                                            fill 
                                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {footerText && (
                    <div className="mt-16 sm:mt-24 text-center animate-fade-in-up delay-300">
                        <p className={`text-lg sm:text-xl md:text-2xl font-heading font-medium italic ${textClass} max-w-4xl mx-auto leading-relaxed`}>
                            {footerText}
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}
