"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";

export interface StoryCardItem {
    id: string;
    slug: string;
    firstName: string;
    dream: string;
    summary: string;
    photoUrl: string;
    badgeText?: string;
}

export interface StoryGridProps {
    stories: StoryCardItem[];
    variant?: "stories" | "news" | "testimonials";
    heading?: string;
    description?: string;
}

export function StoryGrid({
    stories,
    variant = "stories",
    heading = "Our Growing Library of Impact",
    description = "Real educational outcomes celebrated through verified stories of progress, graduation, and community transformation.",
}: StoryGridProps) {
    return (
        <section className="py-20 sm:py-28 bg-white border-t border-gray-100" id="impact-library">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Outcomes</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-cinematic-dark tracking-tight">
                        {heading}
                    </h2>
                    {description && (
                        <p className="text-lg text-gray-600 font-body leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story) => (
                        <div 
                            key={story.id} 
                            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1"
                        >
                            {/* Photo Container */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                                <img
                                    src={story.photoUrl}
                                    alt={story.firstName}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                {story.badgeText && (
                                    <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        {story.badgeText}
                                    </div>
                                )}

                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <h3 className="text-2xl font-bold font-heading group-hover:text-impact-gold transition-colors">
                                        {story.firstName}
                                    </h3>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    {/* Dream */}
                                    {story.dream && (
                                        <div className="bg-amber-50 border border-amber-200/60 rounded-xl px-3.5 py-2 text-xs font-semibold text-amber-900 flex items-center gap-1.5 leading-relaxed">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                            <span>Dream: &ldquo;{story.dream}&rdquo;</span>
                                        </div>
                                    )}

                                    {/* One Sentence Hook */}
                                    <p className="text-sm text-gray-600 leading-relaxed font-body italic">
                                        &ldquo;{story.summary}&rdquo;
                                    </p>
                                </div>

                                {/* Read Story Action CTA */}
                                <div className="pt-4 border-t border-gray-100">
                                    <Link
                                        href={`/sponsor-a-child/${story.slug}`}
                                        className="group/btn w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-cinematic-dark hover:bg-trust-blue text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <span>Read Story</span>
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
