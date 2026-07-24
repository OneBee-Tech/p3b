"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, BookOpen, Landmark, Library, PenTool, Shirt, Clipboard, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

// Helper to resolve icon by string name
const resolveIcon = (name: string) => {
    switch (name) {
        case 'BookOpen': return BookOpen;
        case 'Landmark': return Landmark;
        case 'Library': return Library;
        case 'PenTool': return PenTool;
        case 'Shirt': return Shirt;
        case 'Clipboard': return Clipboard;
        default: return CheckCircle2;
    }
};

export function ContentBlock({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, items, highlight, ctas, variant, featureImage } = meta;

    if (!heading && !description) return null;

    const isGrid = variant === 'grid';

    return (
        <section className={`py-24 md:py-32 ${isGrid ? 'bg-gray-50' : 'bg-white'}`}>
            <div className={`max-w-${isGrid ? '7xl' : '4xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`flex flex-col ${isGrid ? 'lg:flex-row lg:items-center gap-16' : 'text-center md:text-left'}`}>
                    
                    {/* Content Column */}
                    <div className={`${isGrid ? 'lg:w-1/2' : 'w-full'}`}>
                        {heading && (
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 tracking-tight text-cinematic-dark whitespace-pre-line animate-fade-in-up">
                                {heading}
                            </h2>
                        )}
                        
                        {description && (
                            <div className="text-lg md:text-xl text-gray-600 font-body leading-relaxed mb-10 whitespace-pre-line animate-fade-in-up delay-100">
                                {description}
                            </div>
                        )}

                        {items && items.length > 0 && (
                            <div className={`mb-10 text-left animate-fade-in-up delay-200 ${
                                isGrid ? 'grid sm:grid-cols-2 gap-6' : 
                                variant === 'checkmarks' ? 'grid md:grid-cols-2 gap-x-8 gap-y-6' : 
                                'grid sm:grid-cols-2 gap-4'
                            }`}>
                                {items.map((item: any, idx: number) => {
                                    // Handle both object {title, icon, subtitle} and string formats
                                    const title = typeof item === 'string' ? item : item.title;
                                    const subtitle = typeof item === 'object' ? item.subtitle : null;
                                    const IconComponent = typeof item === 'object' && item.icon ? resolveIcon(item.icon) : CheckCircle2;

                                    if (isGrid) {
                                        return (
                                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:border-trust-blue/30 group">
                                                <div className="bg-blue-50 text-trust-blue p-3 rounded-xl group-hover:bg-trust-blue group-hover:text-white transition-colors">
                                                    <IconComponent className="w-6 h-6" />
                                                </div>
                                                <span className="text-gray-800 font-bold mt-3">{title}</span>
                                            </div>
                                        );
                                    }
                                    
                                    if (variant === 'checkmarks') {
                                        return (
                                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/20 transition-colors">
                                                <div className="bg-emerald-500/20 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-bold text-xl mb-1">{title}</h3>
                                                    {subtitle && <p className="text-gray-300 text-sm leading-relaxed">{subtitle}</p>}
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <li key={idx} className="flex items-start gap-3">
                                            <IconComponent className="w-6 h-6 text-trust-blue flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 font-medium">{title}</span>
                                        </li>
                                    );
                                })}
                            </div>
                        )}

                        {highlight && (
                            <div className="bg-impact-gold/10 border-l-4 border-impact-gold p-6 rounded-r-xl mb-10 text-left animate-fade-in-up delay-300">
                                <p className="text-lg font-semibold text-cinematic-dark whitespace-pre-line">
                                    {highlight}
                                </p>
                            </div>
                        )}

                        {ctas && ctas.length > 0 && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up delay-300">
                                {ctas.map((cta: any, idx: number) => (
                                    <Link
                                        key={idx}
                                        href={cta.href}
                                        className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                            cta.variant === 'primary'
                                                ? 'bg-trust-blue hover:bg-blue-700 text-white shadow-lg hover:-translate-y-1'
                                                : 'bg-gray-100 hover:bg-gray-200 text-cinematic-dark hover:-translate-y-1'
                                        }`}
                                    >
                                        {cta.label}
                                        {cta.variant === 'primary' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Optional Image Column for Grid Variant */}
                    {isGrid && featureImage && (
                        <div className="lg:w-1/2 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up delay-400">
                            <Image
                                src={featureImage}
                                alt="Feature illustration"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark/40 to-transparent" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
