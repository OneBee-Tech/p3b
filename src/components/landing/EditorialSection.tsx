"use client";

import Image from "next/image";
import { ProcessFlow } from "./ProcessFlow";

export function EditorialSection({ data, layoutConfig }: { data?: any, layoutConfig?: any }) {
    const meta = data?.metadata || {};
    const { eyebrow, heading, body, quote, image, layout = 'image-left' } = meta;
    const theme = layoutConfig?.theme || 'white';
    
    const isImageLeft = layout === 'image-left';
    const isCenteredImageOnly = layout === 'centered-image-only';

    // Theme color mapping
    const bgClasses = {
        dark: 'bg-cinematic-dark text-white',
        white: 'bg-white text-gray-900',
        light: 'bg-gray-50 text-gray-900',
        neutral: 'bg-gray-100 text-gray-900'
    }[theme as 'dark'|'white'|'light'|'neutral'] || 'bg-white text-gray-900';

    const textBodyClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const textHeadingClass = theme === 'dark' ? 'text-white' : 'text-cinematic-dark';

    return (
        <section className={`py-32 md:py-40 overflow-hidden ${bgClasses}`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                
                {isCenteredImageOnly ? (
                    <div className="flex flex-col items-center text-center">
                        {heading && (
                            <h2 className={`text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 tracking-tight ${textHeadingClass} animate-fade-in-up max-w-5xl mx-auto leading-tight`}>
                                {heading}
                            </h2>
                        )}
                        {body && (
                            <p className={`text-xl md:text-3xl font-body leading-relaxed max-w-4xl mx-auto ${textBodyClass} mb-20 animate-fade-in-up delay-100`}>
                                {body}
                            </p>
                        )}
                        {image && (
                            <figure className="relative h-[500px] lg:h-[800px] w-full rounded-2xl overflow-hidden shadow-2xl group animate-fade-in-up delay-200">
                                <Image
                                    src={image?.src || image}
                                    alt={image?.alt || heading || "Editorial image"}
                                    fill
                                    className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            </figure>
                        )}
                    </div>
                ) : (
                    <div className={`grid grid-cols-12 gap-12 lg:gap-16 items-center`}>
                        
                        {/* Image Column - spans 5-6 columns based on grid layout */}
                        {image && (
                            <div className={`col-span-12 md:col-span-6 relative animate-fade-in-up ${!isImageLeft ? 'md:order-last' : ''}`}>
                                <figure className="relative h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src={image?.src || image}
                                        alt={image?.alt || heading || "Editorial image"}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                    {image?.caption && (
                                        <figcaption className="absolute bottom-6 left-6 right-6 text-white text-sm font-medium drop-shadow-md">
                                            <div className="w-8 h-px bg-impact-gold mb-2" />
                                            {image.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            </div>
                        )}

                        {/* Content Column - spans 6-7 columns */}
                        <div className={`col-span-12 ${image ? 'md:col-span-6' : 'md:col-span-8 md:col-start-3 text-center'} text-left`}>
                            {eyebrow && (
                                <div className={`flex items-center gap-3 mb-6 animate-fade-in-up ${image ? '' : 'justify-center'}`}>
                                    <div className="w-6 h-px bg-impact-gold" />
                                    <span className="text-impact-gold font-bold uppercase tracking-widest text-xs">
                                        {eyebrow}
                                    </span>
                                </div>
                            )}

                            {heading && (
                                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 tracking-tight ${textHeadingClass} animate-fade-in-up`}>
                                    {heading}
                                </h2>
                            )}
                            
                            {body && (
                                <div className={`prose prose-lg md:prose-xl max-w-prose mx-auto ${textBodyClass} font-body leading-relaxed animate-fade-in-up delay-100 whitespace-pre-line`}>
                                    <p>{body}</p>
                                </div>
                            )}

                            {quote && quote.text && (
                                <blockquote className={`mt-12 border-l-4 border-impact-gold pl-6 md:pl-8 italic text-3xl md:text-4xl lg:text-5xl font-body ${textHeadingClass} animate-fade-in-up delay-200 text-left leading-tight drop-shadow-sm`}>
                                    "{quote.text}"
                                    {quote.author && (
                                        <footer className="mt-6 text-base md:text-lg font-bold text-impact-gold not-italic">
                                            — {quote.author}
                                        </footer>
                                    )}
                                </blockquote>
                            )}

                        </div>

                    </div>
                )}

                {/* Transition sentence before timeline */}
                {meta.transitionSentence && (
                    <div className="mt-20 md:mt-28 text-center max-w-3xl mx-auto animate-fade-in-up">
                        <p className={`text-xl md:text-2xl font-body leading-relaxed ${textBodyClass} italic`}>
                            {meta.transitionSentence}
                        </p>
                    </div>
                )}
                
                {/* Timeline / Process Flow rendering inline */}
                {meta.timeline && (
                    <div className="mt-16 md:mt-24 pt-16 border-t border-gray-200/20 max-w-6xl mx-auto">
                        {meta.timelineHeading && (
                            <div className="text-center mb-16 animate-fade-in-up">
                                <h3 className={`text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold tracking-wider uppercase mb-3 ${textHeadingClass}`}>
                                    {meta.timelineHeading}
                                </h3>
                                {meta.timelineSubheading && (
                                    <p className={`text-lg md:text-xl font-body ${textBodyClass} max-w-xl mx-auto`}>
                                        {meta.timelineSubheading}
                                    </p>
                                )}
                            </div>
                        )}
                        <ProcessFlow 
                            data={{ metadata: { items: meta.timeline, flowDirection: 'horizontal' } }} 
                            layoutConfig={layoutConfig} 
                            isEmbedded={true}
                        />
                        {meta.closingSentence && (
                            <div className={`mt-16 text-center text-xl md:text-2xl font-body italic ${textBodyClass} animate-fade-in-up max-w-3xl mx-auto leading-relaxed`}>
                                {meta.closingSentence}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
