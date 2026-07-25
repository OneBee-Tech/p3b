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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-impact-gold/15 border border-impact-gold/30 text-cinematic-dark text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Educational Progression</span>
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

                {/* Timeline Grid Layout */}
                <div className="relative">
                    {/* Desktop Horizontal Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-impact-gold via-trust-blue to-emerald-500 -translate-y-1/2 z-0 opacity-30" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 relative z-10">
                        {steps.map((step, idx) => (
                            <div 
                                key={idx}
                                className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-extrabold font-heading text-impact-gold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                                            {step.stage}
                                        </span>
                                        <div className="w-2.5 h-2.5 rounded-full bg-trust-blue/40 group-hover:bg-trust-blue group-hover:scale-125 transition-all" />
                                    </div>
                                    <h3 className="text-lg font-bold font-heading text-cinematic-dark group-hover:text-trust-blue transition-colors">
                                        {step.title}
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-600 font-body leading-relaxed mt-4">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
