import { FounderStory } from "@/components/FounderStory";
import { RealityStrip } from "@/components/RealityStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { Shield, Users, Target, Clock } from "lucide-react";

import { ContextRibbon } from "@/components/ContextRibbon";

export const metadata = {
    title: "Our Story - Hope for Humanity",
    description: "Learn about the mission, vision, and governance behind our community-first funding model.",
    openGraph: {
        title: "Our Story - Hope for Humanity",
        description: "Learn about the mission, vision, and governance behind our community-first funding model.",
        type: "website",
    },
};

export default function OurStoryPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            {/* Vision Statement Section */}
            <section className="bg-cinematic-dark text-white py-24 mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                        We Believe in the Power of <span className="text-impact-gold">Community</span>.
                    </h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                        Hope for Humanity was founded on a simple premise: education is not an individual luxury, but a structural necessity. We don't just sponsor children; we empower the ecosystems that support them.
                    </p>
                </div>
            </section>

            <ContextRibbon />

            {/* Existing Components */}
            <FounderStory />
            <RealityStrip />

            {/* Governance Block (Static) */}
            <section className="bg-gray-50 border-y border-gray-100 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-heading font-bold text-cinematic-dark">Institutional Governance & Trust</h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Our commitment to 100% financial transparency and rigorous program auditing.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                            <Shield className="w-10 h-10 text-trust-blue mb-6" />
                            <h3 className="text-xl font-bold text-cinematic-dark mb-3">Audited Financials</h3>
                            <p className="text-gray-600">Every donation is cryptographically mapped to its designated program. We maintain a strict append-only financial ledger compliant with international NGO standards.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                            <Target className="w-10 h-10 text-trust-blue mb-6" />
                            <h3 className="text-xl font-bold text-cinematic-dark mb-3">100% Allocation</h3>
                            <p className="text-gray-600">Private donors fund our operational bandwidth, guaranteeing that 100% of community-directed contributions go straight to field implementations.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                            <Users className="w-10 h-10 text-trust-blue mb-6" />
                            <h3 className="text-xl font-bold text-cinematic-dark mb-3">Community Oversight</h3>
                            <p className="text-gray-600">Funds are not disbursed blindly. Programs undergo monthly evaluation by embedded field coordinators before subsequent capital is released.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section (Static) */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-heading font-bold text-cinematic-dark text-center mb-16">Our Journey</h2>

                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cinematic-dark text-impact-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-cinematic-dark text-lg">Inception</h3>
                                    <time className="font-medium text-trust-blue">2018</time>
                                </div>
                                <p className="text-gray-600 mt-2">Started with a single initiative to provide school supplies to 50 students in a rural district.</p>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cinematic-dark text-impact-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-cinematic-dark text-lg">First Full Program</h3>
                                    <time className="font-medium text-trust-blue">2020</time>
                                </div>
                                <p className="text-gray-600 mt-2">Transitioned from a one-to-one model to supporting the entire infrastructural ecosystem of Hope Academy.</p>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cinematic-dark text-impact-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-cinematic-dark text-lg">Global Expansion</h3>
                                    <time className="font-medium text-trust-blue">2023</time>
                                </div>
                                <p className="text-gray-600 mt-2">Scaled the Community-First funding model to 4 new regions, engaging thousands of donors worldwide.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <HowItWorks />
        </main>
    );
}
