import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle, HeartHandshake, Eye, Lock } from "lucide-react";

export async function DashboardTransparencyPreview({ data }: { data?: any }) {
    const meta = data?.metadata || {};
    const heading = meta.heading || "You Deserve to Know Where Your Support Goes";
    const description = meta.description || "Trust is not built through promises alone. It is built through clear processes, proper documentation, and honest reporting.";
    const highlight = meta.highlight || "We want sponsors to see the education they are helping create—not simply receive a thank-you message.";
    const ctas = meta.ctas || [
        { label: "View Our Transparency Standards", href: "/transparency", variant: "primary" },
        { label: "View Reports", href: "/impact", variant: "secondary" }
    ];

    const trustPillars = [
        { title: "Transparent Allocation", icon: Eye, text: "See exactly how funds reach the classroom." },
        { title: "Verified Partners", icon: ShieldCheck, text: "We strictly vet every educational institution." },
        { title: "Honest Reporting", icon: HeartHandshake, text: "Receive regular updates on academic progress." },
        { title: "Safeguarding", icon: Lock, text: "Child protection is our highest priority." },
    ];

    return (
        <section className="bg-warm-bg border-y border-gray-100 py-24 md:py-32 relative overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-trust-blue/5 rounded-r-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Reassurance Pillars Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-500 relative animate-fade-in-up">
                        <div className="absolute top-6 right-6 bg-emerald-50 text-emerald-600 flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                            <CheckCircle className="w-4 h-4" /> 100% Commitment
                        </div>

                        <div className="flex items-center gap-4 mb-10 mt-2">
                            <div className="w-14 h-14 bg-trust-blue/10 rounded-2xl flex items-center justify-center text-trust-blue">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-2xl text-cinematic-dark">Our Accountability</h3>
                                <p className="text-gray-500">How we protect your trust</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {trustPillars.map((pillar, idx) => {
                                const Icon = pillar.icon;
                                return (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="bg-gray-50 p-3 rounded-xl text-trust-blue mt-1">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-cinematic-dark text-lg mb-1">{pillar.title}</h4>
                                            <p className="text-gray-600">{pillar.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Narrative */}
                    <div className="animate-fade-in-up delay-200">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-trust-blue/10 text-trust-blue mb-8 border border-trust-blue/20">
                            <span className="text-sm font-bold tracking-wide uppercase">Built on Trust</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-cinematic-dark mb-8 tracking-tight leading-tight max-w-md whitespace-pre-line">
                            {heading}
                        </h2>

                        <div className="space-y-6 text-gray-600 font-body text-lg leading-relaxed mb-10 whitespace-pre-line">
                            <p>{description}</p>
                            {highlight && (
                                <p className="font-medium text-cinematic-dark border-l-4 border-trust-blue pl-6 py-2 bg-gray-50 rounded-r-lg">
                                    {highlight}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {ctas.map((cta: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={cta.href}
                                    className={`group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:-translate-y-1 ${
                                        cta.variant === 'primary'
                                            ? 'bg-cinematic-dark text-white hover:bg-trust-blue'
                                            : 'bg-white text-cinematic-dark border border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {cta.label}
                                    {cta.variant === 'primary' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
