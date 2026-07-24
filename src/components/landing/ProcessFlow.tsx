"use client";

import { BookOpen, Briefcase, TrendingUp, Users, Heart, Globe, Star, Sparkles, HeartHandshake, MapPin, School, Calculator, CreditCard, FileText, CheckCircle } from "lucide-react";

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
        case 'MapPin': return MapPin;
        case 'School': return School;
        case 'Calculator': return Calculator;
        case 'CreditCard': return CreditCard;
        case 'FileText': return FileText;
        case 'CheckCircle': return CheckCircle;
        default: return Star;
    }
}

export function ProcessFlow({ data, layoutConfig, isEmbedded = false }: { data?: any, layoutConfig?: any, isEmbedded?: boolean }) {
    const meta = data?.metadata || {};
    const { heading, description, flowDirection = 'vertical', variant = isEmbedded ? 'compact' : 'hero' } = meta;
    const items = meta.items || meta.steps;
    const theme = layoutConfig?.theme || 'white';

    const isHorizontal = flowDirection === 'horizontal';
    const isHero = variant === 'hero';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(heading || description) && !isEmbedded && (
                <div className="text-center mb-12 sm:mb-24 animate-fade-in-up">
                    {heading && <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tight mb-4 sm:mb-6 ${textClass}`}>{heading}</h2>}
                    {description && <p className={`text-base sm:text-xl md:text-2xl font-body max-w-3xl mx-auto ${textMutedClass}`}>{description}</p>}
                </div>
            )}

            <div className={`relative ${isHorizontal ? 'w-full' : 'w-full max-w-xl mx-auto'}`}>
                {isHero && isHorizontal ? (
                    <>
                        {/* Desktop S-Curve Layout (md and up) */}
                        <div className="hidden md:flex flex-col gap-24 w-full relative">
                            {/* Top Row: 5 items (cols 1 to 5) */}
                            <div className="grid grid-cols-5 gap-y-12 w-full relative">
                                {items.slice(0, 5).map((item: any, idx: number) => renderDesktopHeroItem(item, idx, false, idx === 4, false, 'col-span-1'))}
                            </div>
                            
                            {/* Bottom Row: 4 items (cols 5 to 2 in reverse) */}
                            <div className="grid grid-cols-5 gap-y-12 w-full relative">
                                {items.slice(5).map((item: any, idx: number) => {
                                    const desktopCols = ['col-start-5', 'col-start-4', 'col-start-3', 'col-start-2'];
                                    const desktopColClass = desktopCols[idx] || '';
                                    return renderDesktopHeroItem(item, idx + 5, true, false, idx === items.slice(5).length - 1, `col-span-1 row-start-1 ${desktopColClass}`);
                                })}
                            </div>
                        </div>

                        {/* Mobile Clean Vertical Timeline (< md) */}
                        <div className="flex md:hidden flex-col gap-8 relative w-full py-2 px-2">
                            {items.map((item: any, idx: number) => renderVerticalItem(item, idx, idx === items.length - 1))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Compact / Chapter Layout - Desktop Horizontal, Mobile Vertical */}
                        <div className={`hidden md:flex ${isHorizontal ? 'flex-wrap justify-center gap-y-16 gap-x-8 md:gap-x-12 md:flex-row items-start' : 'flex-col items-center gap-0'}`}>
                            {items.map((item: any, idx: number) => renderDesktopCompactItem(item, idx, idx === items.length - 1))}
                        </div>
                        {/* Mobile Vertical for Embedded Chapters */}
                        <div className="flex md:hidden flex-col gap-8 relative w-full py-2 px-2">
                            {items.map((item: any, idx: number) => renderVerticalItem(item, idx, idx === items.length - 1))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    // Mobile & Standard Vertical Item (Icon on left, Line connecting icons, Text on right)
    function renderVerticalItem(item: any, idx: number, isLast: boolean) {
        const itemLabel = typeof item === 'string' ? item : item.label || item.title;
        const itemIcon = typeof item === 'object' && item.icon ? item.icon : null;
        const IconComponent = itemIcon ? resolveIcon(itemIcon) : Star;
        const desc = item.description || item.subtitle;

        return (
            <div key={idx} className="relative flex items-start gap-5 w-full animate-fade-in-up" style={{ animationDelay: `${idx * 60}ms` }}>
                {/* Connecting Line */}
                {!isLast && (
                    <div className="absolute left-[23px] top-[24px] w-[3px] h-[calc(100%+32px)] bg-impact-gold/60 shadow-[0_0_10px_rgba(253,199,0,0.4)] -z-10" />
                )}

                {/* Icon */}
                <div className={`relative z-10 rounded-full border-2 border-impact-gold ${theme === 'dark' ? 'bg-cinematic-dark text-impact-gold' : 'bg-white text-cinematic-dark'} w-12 h-12 flex-shrink-0 flex items-center justify-center shadow-md`}>
                    <IconComponent className="w-6 h-6" />
                </div>

                {/* Text shifted to right so line NEVER overlaps */}
                <div className="flex flex-col pt-1 text-left flex-1">
                    <h3 className={`text-lg sm:text-xl font-bold font-heading ${textClass} mb-1 leading-snug`}>
                        {itemLabel}
                    </h3>
                    {desc && (
                        <p className={`text-sm font-body ${textMutedClass} leading-snug`}>
                            {desc}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Desktop Hero Item (S-Curve)
    function renderDesktopHeroItem(item: any, idx: number, isReversedRow: boolean, isLastInTopRow: boolean, isLastTotal: boolean, gridClass: string) {
        const itemLabel = typeof item === 'string' ? item : item.label || item.title;
        const itemIcon = typeof item === 'object' && item.icon ? item.icon : null;
        const isHighlight = typeof item === 'object' && item.isHighlight;
        const IconComponent = itemIcon ? resolveIcon(itemIcon) : Star;
        
        return (
            <div key={idx} className={`relative flex items-center flex-col animate-fade-in-up group ${gridClass}`} style={{ animationDelay: `${idx * 100}ms` }}>
                
                {/* Horizontal Connecting Line */}
                {!isLastTotal && !isLastInTopRow && (
                    <div className={`absolute bg-impact-gold/60 shadow-[0_0_12px_rgba(253,199,0,0.4)] transition-colors duration-700 group-hover:bg-impact-gold hidden md:block md:w-full md:-z-10 md:top-[30px] md:h-[3px] ${isReversedRow ? 'md:right-1/2' : 'md:left-1/2'}`} />
                )}

                {/* U-Turn Connecting Line (only on last item of top row) */}
                {isLastInTopRow && (
                    <div className="hidden md:block absolute left-[50%] top-[30px] w-[calc(50%+24px)] h-[calc(100%+96px)] border-t-[3px] border-r-[3px] border-b-[3px] border-impact-gold/60 rounded-r-[3rem] -z-10" style={{ filter: 'drop-shadow(4px 0 8px rgba(253,199,0,0.3))' }} />
                )}

                {/* Dot / Icon Indicator */}
                <div className={`relative z-10 rounded-full border-2 ${
                    isHighlight 
                    ? 'border-impact-gold bg-impact-gold text-cinematic-dark shadow-[0_0_30px_rgba(253,199,0,0.8)] scale-110' 
                    : 'border-impact-gold bg-impact-gold/20 shadow-[0_0_20px_rgba(253,199,0,0.5)]'
                } transition-all duration-500 group-hover:scale-110 group-hover:bg-impact-gold flex flex-shrink-0 items-center justify-center w-16 h-16 md:mb-8 bg-cinematic-dark`}>
                    {IconComponent && <IconComponent className={`w-8 h-8 opacity-90 group-hover:text-cinematic-dark ${theme === 'dark' ? 'text-white' : 'text-impact-gold'}`} />}
                </div>
                
                {/* Label & Subtitle */}
                <div className="flex flex-col items-center justify-center text-center">
                    <h3 className={`text-xl md:text-2xl font-bold font-heading ${isHighlight ? 'text-impact-gold' : textClass} mb-2 leading-tight`}>{itemLabel}</h3>
                    {(item.description || item.subtitle) && (
                        <p className={`text-sm md:text-base font-body ${isHighlight ? 'text-impact-gold/90 font-medium' : textMutedClass} leading-snug max-w-[160px]`}>{item.description || item.subtitle}</p>
                    )}
                </div>
            </div>
        );
    }

    // Desktop Compact Item (Chapters)
    function renderDesktopCompactItem(item: any, idx: number, isLastTotal: boolean) {
        const itemLabel = typeof item === 'string' ? item : item.label || item.title;
        const itemIcon = typeof item === 'object' && item.icon ? item.icon : null;
        const isHighlight = typeof item === 'object' && item.isHighlight;
        const IconComponent = itemIcon ? resolveIcon(itemIcon) : Star;

        return (
            <div key={idx} className="relative flex items-center flex-col animate-fade-in-up group flex-1 min-w-[120px]" style={{ animationDelay: `${idx * 100}ms` }}>
                {!isLastTotal && (
                    <div className="absolute bg-impact-gold/60 shadow-[0_0_12px_rgba(253,199,0,0.4)] transition-colors duration-700 group-hover:bg-impact-gold hidden md:block md:w-full md:-z-10 md:top-[16px] md:h-[2px] md:left-1/2" />
                )}
                <div className="relative z-10 rounded-full border-2 border-impact-gold bg-white shadow-[0_0_20px_rgba(253,199,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:bg-impact-gold flex flex-shrink-0 items-center justify-center w-8 h-8 md:mb-5">
                    {IconComponent && <IconComponent className={`w-4 h-4 text-cinematic-dark`} />}
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <h3 className={`text-base md:text-lg font-bold font-heading ${textClass} mb-1 leading-tight`}>{itemLabel}</h3>
                    {(item.description || item.subtitle) && (
                        <p className={`text-xs md:text-sm font-body ${textMutedClass} leading-snug max-w-[160px]`}>{item.description || item.subtitle}</p>
                    )}
                </div>
            </div>
        );
    }

    if (isEmbedded) {
        return content;
    }

    return (
        <section className={`py-16 sm:py-28 md:py-48 overflow-hidden ${bgClasses}`}>
            {content}
        </section>
    );
}
