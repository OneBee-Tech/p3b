"use client";

import { BookOpen, Briefcase, TrendingUp, Users, Heart, Globe, Star, Sparkles, HeartHandshake } from "lucide-react";

const resolveIcon = (name: string) => {
    switch (name) {
        case 'BookOpen': return BookOpen;
        case 'Briefcase': return Briefcase;
        case 'TrendingUp': return TrendingUp;
        case 'Users': return Users;
        case 'Heart': return Heart;
        case 'Globe': return Globe;
        case 'Sparkles': return Sparkles;
        case 'HeartHandshake': return HeartHandshake;
        default: return Star;
    }
}

export function ProcessFlow({ data, layoutConfig, isEmbedded = false }: { data?: any, layoutConfig?: any, isEmbedded?: boolean }) {
    const meta = data?.metadata || {};
    const { heading, description, items, flowDirection = 'vertical' } = meta;
    const theme = layoutConfig?.theme || 'white';

    const isHorizontal = flowDirection === 'horizontal';

    const bgClasses = {
        dark: 'bg-cinematic-dark text-white',
        white: 'bg-white text-gray-900',
        light: 'bg-gray-50 text-gray-900',
        neutral: 'bg-gray-100 text-gray-900'
    }[theme as 'dark'|'white'|'light'|'neutral'] || 'bg-white text-gray-900';

    const textClass = theme === 'dark' ? 'text-white' : 'text-cinematic-dark';
    const textMutedClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

    if (!items || !Array.isArray(items)) return null;

    const content = (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {(heading || description) && !isEmbedded && (
                <div className="text-center mb-24 animate-fade-in-up">
                    {heading && <h2 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 ${textClass}`}>{heading}</h2>}
                    {description && <p className={`text-xl font-body max-w-2xl mx-auto ${textMutedClass}`}>{description}</p>}
                </div>
            )}

            <div className={`relative flex ${isHorizontal ? 'flex-col md:flex-row items-start justify-between md:gap-3 gap-12' : 'flex-col items-center gap-0'}`}>
                {items.map((item: any, idx: number) => {
                    const itemLabel = typeof item === 'string' ? item : item.label;
                    const itemIcon = typeof item === 'object' && item.icon ? item.icon : null;
                    const isHighlight = typeof item === 'object' && item.isHighlight;
                    const IconComponent = itemIcon ? resolveIcon(itemIcon) : null;
                    
                    return (
                        <div key={idx} className={`relative flex ${isHorizontal ? 'items-center flex-row md:flex-col md:flex-1' : 'flex-col items-center w-full'} animate-fade-in-up group`} style={{ animationDelay: `${idx * 150}ms` }}>
                            
                            {/* Connecting Line (15-20% more visible with gold glow) */}
                            {idx !== items.length - 1 && (
                                <div className={`absolute bg-impact-gold/60 shadow-[0_0_8px_rgba(253,199,0,0.3)] transition-colors duration-700 group-hover:bg-impact-gold ${
                                    isHorizontal 
                                    ? 'left-[20px] top-[10px] w-px h-full md:left-1/2 md:top-[12px] md:w-full md:h-[2px] md:-z-10' 
                                    : 'left-1/2 top-[24px] w-px h-full -z-10'
                                }`} />
                            )}

                            {/* Dot / Icon Indicator */}
                            <div className={`relative z-10 w-7 h-7 rounded-full border-2 ${
                                isHighlight 
                                ? 'border-impact-gold bg-impact-gold text-cinematic-dark shadow-[0_0_20px_rgba(253,199,0,0.8)] scale-110' 
                                : 'border-impact-gold bg-impact-gold/20 shadow-[0_0_15px_rgba(253,199,0,0.4)]'
                            } transition-all duration-500 group-hover:scale-125 group-hover:bg-impact-gold flex flex-shrink-0 items-center justify-center ${isHorizontal ? 'mr-6 md:mr-0 md:mb-6' : 'mb-6'}`}>
                                {isHighlight && <div className="w-2.5 h-2.5 rounded-full bg-cinematic-dark" />}
                            </div>
                            
                            {/* Label & Subtle Icon */}
                            <div className={`flex flex-col items-center justify-center text-center ${isHorizontal ? 'text-left md:text-center' : 'text-center'}`}>
                                {IconComponent && (
                                    <IconComponent className={`w-6 h-6 mb-3 ${isHighlight ? 'text-impact-gold opacity-100 scale-110' : 'opacity-60 ' + (theme === 'dark' ? 'text-white' : 'text-cinematic-dark')}`} strokeWidth={isHighlight ? 2 : 1.5} />
                                )}
                                <h3 className={`text-lg md:text-xl font-bold font-heading ${isHighlight ? 'text-impact-gold' : textClass} mb-1.5 leading-snug`}>{itemLabel}</h3>
                                {item.description && (
                                    <p className={`text-xs md:text-sm font-body ${isHighlight ? 'text-impact-gold/90 font-medium' : textMutedClass} leading-snug max-w-[140px]`}>{item.description}</p>
                                )}
                            </div>
                            
                            {/* Vertical spacing for vertical flow */}
                            {!isHorizontal && idx !== items.length - 1 && <div className="h-16" />}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    if (isEmbedded) {
        return content;
    }

    return (
        <section className={`py-32 md:py-40 overflow-hidden ${bgClasses}`}>
            {content}
        </section>
    );
}
