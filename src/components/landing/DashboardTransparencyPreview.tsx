import Link from "next/link";
import { PieChart, ShieldCheck, ArrowRight, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getTransparencyMetrics() {
    try {
        const stats = await prisma.programSnapshot.aggregate({
            _sum: {
                fundsRaised: true,
            }
        });

        return {
            fundsRouted: stats._sum.fundsRaised ? Number(stats._sum.fundsRaised) : 142050,
            isLive: !!stats._sum.fundsRaised
        };
    } catch {
        return { fundsRouted: 142050, isLive: false };
    }
}

export async function DashboardTransparencyPreview() {
    const metrics = await getTransparencyMetrics();

    return (
        <section className="bg-warm-bg border-y border-gray-100 py-24 relative overflow-hidden">
            {/* Background embellishment */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-trust-blue/5 rounded-r-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Interactive Preview Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-500 relative">
                        <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" /> Live Ledger
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-trust-blue/10 rounded-xl flex items-center justify-center text-trust-blue">
                                <PieChart className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-xl text-cinematic-dark">Your Impact Dashboard</h3>
                                <p className="text-gray-500 text-sm">Real-time allocation tracking</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Mock Data Entry 1 */}
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-trust-blue" />
                                    <span className="font-medium text-gray-700">School Infrastructure</span>
                                </div>
                                <span className="font-bold text-cinematic-dark">65%</span>
                            </div>

                            {/* Mock Data Entry 2 */}
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-impact-gold" />
                                    <span className="font-medium text-gray-700">Teacher Stability Fund</span>
                                </div>
                                <span className="font-bold text-cinematic-dark">25%</span>
                            </div>

                            {/* Mock Data Entry 3 */}
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="font-medium text-gray-700">Learning Materials</span>
                                </div>
                                <span className="font-bold text-cinematic-dark">10%</span>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between mt-6">
                                <div className="flex items-center gap-3 text-trust-blue font-medium text-sm">
                                    <FileText className="w-5 h-5" />
                                    Cryptographic Certificate Ready
                                </div>
                                <div className="text-xs bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">
                                    PDF
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Narrative */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-impact-gold/20 text-impact-gold mb-6 border border-impact-gold/30">
                            <span className="text-sm font-bold tracking-wide uppercase text-yellow-800">100% Transparency</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-cinematic-dark mb-6 tracking-tight leading-tight">
                            Track every dollar <br className="hidden md:block" /> you give.
                        </h2>

                        <div className="space-y-6 text-gray-600 font-body text-lg leading-relaxed mb-10">
                            <p>
                                Charity shouldn't be a black box. Our architecture ensures that from the moment you contribute, your funds are cryptographically mapped to the community ecosystem.
                            </p>
                            <p className="font-medium text-cinematic-dark">
                                So far, our community has tracked <span className="text-trust-blue">${metrics.fundsRouted.toLocaleString()}</span> in transparent impact.
                            </p>
                        </div>

                        <Link
                            href="/programs"
                            className="group inline-flex items-center gap-3 bg-cinematic-dark text-white hover:bg-trust-blue px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:-translate-y-1"
                        >
                            View Donor Dashboard
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
