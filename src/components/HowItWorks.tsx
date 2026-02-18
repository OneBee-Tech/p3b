import { BookOpen, School, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        title: "The Seed",
        description: "Your donation provides books, uniforms, and meals.",
        icon: BookOpen,
        amount: "$1 = 1 Day of School",
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        title: "The Growth",
        description: "Students attend safe classrooms with trained teachers.",
        icon: School,
        amount: "$30 = 1 Month of Education",
        color: "bg-blue-100 text-trust-blue",
    },
    {
        title: "The Future",
        description: "Graduates return to uplift their entire community.",
        icon: GraduationCap,
        amount: "$365 = 1 Year of Transformation",
        color: "bg-impact-gold/20 text-yellow-700",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-warm-ivory text-cinematic-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="block text-trust-blue font-bold tracking-wider text-sm uppercase mb-4">The Journey</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">How Change Happens</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Transparency is our promise. Track every dollar from your wallet to their classroom.
                    </p>
                </div>

                {/* Horizontal Journey InfoGraphic */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-200 -z-10">
                        <div className="h-full bg-gradient-to-r from-emerald-200 via-blue-200 to-yellow-200 w-full opacity-50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {/* Node Circle */}
                                <div className={cn(
                                    "w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg",
                                    step.color
                                )}>
                                    <step.icon className="w-10 h-10" />
                                </div>

                                {/* Card Content */}
                                <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{step.description}</p>

                                    {/* Psychology Anchor */}
                                    <div className="inline-block bg-cinematic-dark text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                                        {step.amount}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
