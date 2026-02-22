import { ImpactReport } from "@/components/ImpactReport";
import { PieChart, TrendingUp, ShieldCheck, Download, FileText, FileBadge } from "lucide-react";

import { ContextRibbon } from "@/components/ContextRibbon";

export const metadata = {
    title: "Our Impact - Hope for Humanity",
    description: "Data-forward transparency and financial accountability metrics.",
    openGraph: {
        title: "Our Impact - Hope for Humanity",
        description: "Data-forward transparency and financial accountability metrics.",
        type: "website",
    },
};

export default function ImpactPage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <section className="bg-cinematic-dark text-white pt-36 pb-24 mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Radical Transparency</h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                        Follow every dollar. See how we allocate funds to optimize child education and wellbeing.
                    </p>
                </div>
            </section>
            <ContextRibbon />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

                {/* Transparency Explanation */}
                <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-3xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-50 text-trust-blue p-4 rounded-full">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold font-heading text-cinematic-dark">Financial Responsibility</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed max-w-3xl text-lg">
                        Our model guarantees that 100% of your child sponsorships are directed efficiently entirely toward program execution. Our operational bandwidth is subsidized through a private endowment and specialized donor commitments, allowing your capital to perform directly in the field.
                    </p>
                </div>

                {/* Static Metrics Placeholders */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <PieChart className="w-8 h-8 text-trust-blue mb-4" />
                        <h3 className="text-xl font-bold text-cinematic-dark mb-2">Allocation Matrix</h3>
                        <p className="text-gray-500">View real-time breakdowns of tuition, education support, and supply expenditures across our global footprint.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <TrendingUp className="w-8 h-8 text-emerald-500 mb-4" />
                        <h3 className="text-xl font-bold text-cinematic-dark mb-2">Programmatic Growth</h3>
                        <p className="text-gray-500">Track longitudinal growth in student retention and sponsored child graduation rates quarter over quarter.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <ShieldCheck className="w-8 h-8 text-impact-gold mb-4" />
                        <h3 className="text-xl font-bold text-cinematic-dark mb-2">Audit Verified</h3>
                        <p className="text-gray-500">Our ledgers are mathematically append-only, ensuring your contribution trajectory is strictly preserved.</p>
                    </div>
                </div>

                {/* Institutional Governance Documents */}
                <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-3xl mt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold font-heading text-cinematic-dark">Governance & Reporting</h2>
                        <p className="text-gray-500 mt-2">Access our latest audited financials and partnership certifications.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "2024 Annual Report", format: "PDF", icon: FileText },
                            { title: "Financial Audit Q1", format: "PDF", icon: PieChart },
                            { title: "NGO Documentation", format: "PDF", icon: FileBadge },
                            { title: "NGO Registration", format: "PDF", icon: ShieldCheck },
                        ].map((doc, idx) => (
                            <a key={idx} href="#" className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-trust-blue/30 hover:bg-trust-blue/5 transition-all group">
                                <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-white group-hover:text-trust-blue transition-colors">
                                    <doc.icon className="w-5 h-5 text-gray-500 group-hover:text-trust-blue" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-cinematic-dark group-hover:text-trust-blue transition-colors">{doc.title}</p>
                                    <span className="text-xs text-gray-400 font-medium">{doc.format} Document</span>
                                </div>
                                <Download className="w-4 h-4 text-gray-300 group-hover:text-trust-blue transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Integration of existing component */}
                <div className="mt-16 bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-3xl">
                    <h2 className="text-2xl font-bold font-heading text-cinematic-dark mb-8 text-center">Historical Child Impact</h2>
                    <ImpactReport />
                </div>
            </section>
        </main>
    );
}
