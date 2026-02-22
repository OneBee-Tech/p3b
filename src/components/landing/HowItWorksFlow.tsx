import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function HowItWorksFlow() {
    const steps = [
        {
            number: "01",
            title: "Sponsor a Child",
            description: "Connect with a child's educational journey and become a vital part of their support system.",
        },
        {
            number: "02",
            title: "Identify Needs",
            description: "Verified partners pinpoint the exact education support, tuitions, and materials required.",
        },
        {
            number: "03",
            title: "Provide Resources",
            description: "Funds are deployed transparently to cover school fees, provide learning kits, and support wellbeing.",
        },
        {
            number: "04",
            title: "Transform Futures",
            description: "Thousands of sponsored children rise out of poverty through sustained, structured support.",
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text & Flow */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trust-blue/10 text-trust-blue mb-6">
                            <span className="text-sm font-bold tracking-wide uppercase">The Sponsorship Journey</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-cinematic-dark mb-6 tracking-tight leading-tight">
                            Sponsorship ensures access to education, supplies, and wellbeing services.
                        </h2>
                        <p className="text-lg text-gray-600 mb-12 leading-relaxed font-body">
                            While sponsorship is presented at the child level, funds are ethically administered through verified education partners to ensure continuity, safeguarding, and resource stability.
                        </p>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-trust-blue font-bold font-heading group-hover:bg-trust-blue group-hover:text-white transition-colors duration-300">
                                            {step.number}
                                        </div>
                                        {index !== steps.length - 1 && (
                                            <div className="w-px h-full bg-gray-200 mt-4 group-hover:bg-trust-blue/30 transition-colors" />
                                        )}
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="text-xl font-bold text-cinematic-dark mb-2 flex items-center gap-2">
                                            {step.title}
                                            {index === steps.length - 1 && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed font-body">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2673&auto=format&fit=crop"
                            alt="Symbolic imagery of books representing educational support"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/20 to-transparent" />

                        {/* Privacy Disclaimer */}
                        <div className="absolute top-4 right-4 bg-cinematic-dark/80 backdrop-blur-md rounded-lg p-3 border border-white/20 text-xs text-white/80 max-w-[250px] text-right">
                            Images are representative. Child identities are protected for safety.
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <blockquote className="text-white font-medium text-lg italic mb-4">
                                    "When you sponsor a child's education, you build a foundation that elevates their entire future."
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-trust-blue flex items-center justify-center text-white font-bold">
                                        E
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Elena R.</div>
                                        <div className="text-impact-gold text-xs font-bold uppercase tracking-wider">Education Partner</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
