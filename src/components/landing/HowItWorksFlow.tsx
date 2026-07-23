import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HowItWorksFlow({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const heading = meta.heading || "Sponsorship ensures access to education, supplies, and wellbeing services.";
    const description = meta.description || "";
    const steps = meta.steps || [
        {
            title: "Sponsor a Child",
            description: "Connect with a child's educational journey and become a vital part of their support system.",
        },
        {
            title: "Identify Needs",
            description: "Verified partners pinpoint the exact education support, tuitions, and materials required.",
        },
        {
            title: "Provide Resources",
            description: "Funds are deployed transparently to cover school fees, provide learning kits, and support wellbeing.",
        },
        {
            title: "Transform Futures",
            description: "Thousands of sponsored children rise out of poverty through sustained, structured support.",
        }
    ];
    const ctas = meta.ctas || [];

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text & Flow */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trust-blue/10 text-trust-blue mb-6">
                            <span className="text-sm font-bold tracking-wide uppercase">The Sponsorship Journey</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-cinematic-dark mb-6 tracking-tight leading-tight whitespace-pre-line">
                            {heading}
                        </h2>
                        {description && (
                            <p className="text-lg text-gray-600 mb-12 leading-relaxed font-body whitespace-pre-line">
                                {description}
                            </p>
                        )}

                        <div className="space-y-8">
                            {steps.map((step: any, index: number) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-trust-blue font-bold font-heading group-hover:bg-trust-blue group-hover:text-white transition-colors duration-300">
                                            {(index + 1).toString().padStart(2, '0')}
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

                        {ctas && ctas.length > 0 && (
                            <div className="mt-8">
                                {ctas.map((cta: any, idx: number) => (
                                    <Link
                                        key={idx}
                                        href={cta.href}
                                        className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                            cta.variant === 'primary'
                                                ? 'bg-trust-blue hover:bg-blue-700 text-white shadow-lg hover:-translate-y-1'
                                                : 'bg-gray-100 hover:bg-gray-200 text-cinematic-dark'
                                        }`}
                                    >
                                        {cta.label}
                                        {cta.variant === 'primary' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Visual */}
                    <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group sticky top-24">
                        <Image
                            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2673&auto=format&fit=crop"
                            alt="Symbolic imagery of books representing educational support"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/20 to-transparent" />

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
