"use client";

import Image from "next/image";

export function EditorialSection({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { eyebrow, heading, body, quote, image, layout = 'image-left' } = meta;
    
    const isImageLeft = layout === 'image-left';

    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${isImageLeft ? '' : 'md:flex-row-reverse'}`}>
                    
                    {/* Image Column */}
                    {image && (
                        <div className="w-full md:w-1/2 relative animate-fade-in-up">
                            <figure className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                                <Image
                                    src={image?.src || image}
                                    alt={image?.alt || heading || "Editorial image"}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark/40 to-transparent opacity-60" />
                                {image?.caption && (
                                    <figcaption className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium drop-shadow-md">
                                        {image.caption}
                                    </figcaption>
                                )}
                            </figure>
                        </div>
                    )}

                    {/* Content Column */}
                    <div className={`w-full ${image ? 'md:w-1/2' : ''} text-center md:text-left`}>
                        {eyebrow && (
                            <div className="text-impact-gold font-bold uppercase tracking-widest text-sm mb-4 animate-fade-in-up">
                                {eyebrow}
                            </div>
                        )}

                        {heading && (
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-8 tracking-tight text-cinematic-dark animate-fade-in-up">
                                {heading}
                            </h2>
                        )}
                        
                        {body && (
                            <div className="prose prose-lg prose-gray max-w-none text-gray-600 font-body leading-relaxed animate-fade-in-up delay-100 whitespace-pre-line">
                                <p>{body}</p>
                            </div>
                        )}

                        {quote && quote.text && (
                            <blockquote className="mt-8 border-l-4 border-impact-gold pl-6 italic text-xl md:text-2xl font-body text-cinematic-dark animate-fade-in-up delay-200">
                                "{quote.text}"
                                {quote.author && (
                                    <footer className="mt-4 text-base font-bold text-trust-blue not-italic">
                                        — {quote.author}
                                    </footer>
                                )}
                            </blockquote>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
