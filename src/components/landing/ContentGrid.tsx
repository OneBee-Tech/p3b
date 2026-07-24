"use client";

import { CheckCircle2, HeartHandshake, ShieldCheck, Star, Lock, Clock, Heart } from "lucide-react";

const resolveIcon = (name: string) => {
    switch (name) {
        case 'UserHeart': return HeartHandshake;
        case 'ShieldCheck': return ShieldCheck;
        case 'CheckCircle': return CheckCircle2;
        case 'Star': return Star;
        case 'Lock': return Lock;
        case 'Clock': return Clock;
        case 'Heart': return Heart;
        default: return CheckCircle2;
    }
};

export function ContentGrid({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const { heading, description, items } = meta;

    if (!items || !Array.isArray(items)) return null;

    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {(heading || description) && (
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                        {heading && <h2 className="text-3xl md:text-4xl font-heading font-bold text-cinematic-dark mb-6 tracking-tight">{heading}</h2>}
                        {description && <p className="text-lg text-gray-600 font-body leading-relaxed">{description}</p>}
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item: any, idx: number) => {
                        const Icon = item.icon ? resolveIcon(item.icon) : CheckCircle2;
                        return (
                            <div 
                                key={idx} 
                                className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-impact-gold/30 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-trust-blue group-hover:scale-110 group-hover:text-impact-gold transition-all duration-300">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-cinematic-dark mb-3">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-gray-600 font-body text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
