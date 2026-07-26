"use client";

import { Sparkles, Heart, School, BookOpen, TrendingUp, GraduationCap, Compass } from "lucide-react";

export interface JourneyStep {
    stage: string;
    title: string;
    description: string;
    icon?: string;
}

export interface JourneyTimelineProps {
    steps?: JourneyStep[];
    variant?: "education" | "donation" | "corporate";
    heading?: string;
    description?: string;
}

const defaultEducationSteps: JourneyStep[] = [
    {
        stage: "01",
        title: "Dream",
        description: "Every child carries aspirations of becoming a teacher, engineer, or doctor.",
        icon: "Sparkles"
    },
    {
        stage: "02",
        title: "Opportunity",
        description: "A sponsor steps forward, providing $1 a day for tuition and supplies.",
        icon: "Heart"
    },
    {
        stage: "03",
        title: "Enrollment",
        description: "The child is verified and enrolled into a quality community school.",
        icon: "School"
    },
    {
        stage: "04",
        title: "Learning",
        description: "Daily attendance, proper uniforms, textbooks, and daily nourishment.",
        icon: "BookOpen"
    },
    {
        stage: "05",
        title: "Progress",
        description: "Bi-annual report cards and academic growth shared with sponsors.",
        icon: "TrendingUp"
    },
    {
        stage: "06",
        title: "Graduation",
        description: "Passing exit examinations with honors and completing primary/secondary school.",
        icon: "GraduationCap"
    },
    {
        stage: "07",
        title: "Future",
        description: "University entry, vocational mastery, and giving back to their local community.",
        icon: "Compass"
    }
];

export function JourneyTimeline({
    steps = defaultEducationSteps,
    variant = "education",
    heading = "The Journey of Educational Impact",
    description = "Impact is not an event—it is a long-term commitment that transforms a child's entire life path.",
}: JourneyTimelineProps) {
    return (
        <section className="py-20 sm:py-28 bg-warm-bg overflow-hidden" id="journey-timeline">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-cinematic-dark tracking-tight">
                        {heading}
                    </h2>
                    {description && (
                        <p className="text-lg text-gray-600 font-body leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {/* Timeline Vertical Flow Layout */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical Connecting Line */}
                    <div className="absolute top-4 bottom-4 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-impact-gold via-trust-blue to-emerald-500 opacity-40 z-0" />

                    <div className="space-y-8 relative z-10">
                        {steps.map((step, idx) => (
                            <div 
                                key={idx}
                                className="flex items-start gap-6 group"
                            >
                                {/* Step Circle Indicator */}
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-impact-gold/40 text-impact-gold font-heading font-extrabold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md group-hover:border-trust-blue group-hover:text-trust-blue group-hover:scale-110 transition-all duration-300">
                                    {step.stage || `0${idx + 1}`}
                                </div>

                                {/* Step Content Card */}
                                <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex-1">
                                    <h3 className="text-xl font-bold font-heading text-cinematic-dark group-hover:text-trust-blue transition-colors mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 font-body leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
