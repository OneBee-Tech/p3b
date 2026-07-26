"use client";

import { Sparkles, CheckCircle2, Clock, Target } from "lucide-react";

export interface MetricItem {
    id: string;
    label: string;
    value: string | number;
    sublabel?: string;
    status?: "Goal" | "In Progress" | "Verified";
    icon?: string;
}

export interface MetricsGridProps {
    metrics: MetricItem[];
    variant?: "impact" | "corporate" | "editorial";
    mode?: "launch" | "operational";
    heading?: string;
    description?: string;
}

export function MetricsGrid({
    metrics,
    variant = "impact",
    mode = "launch",
    heading = "Measurable Change",
    description = "Every metric represents real educational progress. Where programs are developing, we clearly distinguish goals, active work, and verified results.",
}: MetricsGridProps) {
    return (
        <section className="py-20 sm:py-28 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
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

                {/* Metric Cards Grid (Apple-style Typography & Whitespace) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((item) => {
                        const statusColor = 
                            item.status === "Verified"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.status === "In Progress"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-blue-50 text-blue-700 border-blue-200";

                        const StatusIcon = 
                            item.status === "Verified"
                                ? CheckCircle2
                                : item.status === "In Progress"
                                ? Clock
                                : Target;

                        return (
                            <div 
                                key={item.id} 
                                className="bg-gray-50/70 border border-gray-100 p-8 rounded-3xl flex flex-col justify-between hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="space-y-4">
                                    {/* Large Apple-Style Stat Number */}
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-cinematic-dark group-hover:text-trust-blue transition-colors tracking-tight break-words">
                                        {item.value}
                                    </div>
                                </div>

                                {/* Label & Human Explanation Subtitle */}
                                <div className="pt-6 border-t border-gray-200/60 mt-6 space-y-1">
                                    <h3 className="font-bold text-base text-cinematic-dark font-heading leading-snug">
                                        {item.label}
                                    </h3>
                                    {item.sublabel && (
                                        <p className="text-xs text-gray-500 font-body leading-relaxed">
                                            {item.sublabel}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
