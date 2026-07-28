import { GratitudeWall } from "@/components/GratitudeWall";
import { Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ContextRibbon } from "@/components/ContextRibbon";

export const metadata = {
    title: "Gratitude & Donor Recognition - Hope for Humanity",
    description: "A tribute to the global donors whose commitments make our work possible.",
    openGraph: {
        title: "Gratitude & Donor Recognition - Hope for Humanity",
        description: "A tribute to the global donors whose commitments make our work possible.",
        type: "website",
    },
};

export default function GratitudePage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            <section className="bg-cinematic-dark text-white pt-36 pb-24 mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Our Donor Community</h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                        A global network of advocates making educational access a reality.
                    </p>
                </div>
            </section>
            <ContextRibbon />

            <section className="max-w-7xl mx-auto px-4 py-8 space-y-24">
                {/* Testimonials Static section */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 transition-all hover:bg-white hover:shadow-md h-full flex flex-col justify-between">
                        <div>
                            <Quote className="w-10 h-10 text-gray-300 mb-6" />
                            <p className="text-xl font-medium text-gray-400 italic leading-relaxed mb-8">Testimonial space reserved for our community members.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold"></div>
                            <div className="font-bold text-gray-400">Community Member<span className="block text-sm text-gray-400 font-normal">Supporter</span></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 transition-all hover:bg-white hover:shadow-md h-full flex flex-col justify-between">
                        <div>
                            <Quote className="w-10 h-10 text-gray-300 mb-6" />
                            <p className="text-xl font-medium text-gray-400 italic leading-relaxed mb-8">Testimonial space reserved for our community members.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold"></div>
                            <div className="font-bold text-gray-400">Community Member<span className="block text-sm text-gray-400 font-normal">Supporter</span></div>
                        </div>
                    </div>
                </div>

                <GratitudeWall />

                {/* CTA */}
                <div className="bg-cinematic-dark text-white p-12 md:p-16 rounded-3xl text-center space-y-8 border border-white/10">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">Join the Movement</h2>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        You can make a structural difference today by supporting a community program.
                    </p>
                    <Link href="/programs" className="inline-block">
                        <Button variant="impact" size="lg" className="w-full sm:w-auto font-bold text-lg px-8 py-6">
                            Support a Community
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
