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
        <main className="min-h-screen bg-white pt-24 pb-20">
            <section className="bg-cinematic-dark text-white py-24 mb-12">
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
                    <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                        <Quote className="w-10 h-10 text-gray-300 mb-6" />
                        <p className="text-xl font-medium text-gray-700 leading-relaxed mb-8">"Knowing that my contribution directly fuels an entire community ecosystem instead of a single isolated case gives me tremendous confidence in their model."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-cinematic-dark rounded-full flex items-center justify-center text-impact-gold font-bold">SJ</div>
                            <div className="font-bold text-cinematic-dark">Sarah J.<span className="block text-sm text-gray-500 font-normal">Impact Investor</span></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                        <Quote className="w-10 h-10 text-gray-300 mb-6" />
                        <p className="text-xl font-medium text-gray-700 leading-relaxed mb-8">"Their transparent ledger and monthly programmatic snapshots provide exactly the kind of accountability I've been looking for in the modern NGO space."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-trust-blue rounded-full flex items-center justify-center text-white font-bold">MT</div>
                            <div className="font-bold text-cinematic-dark">Marcus T.<span className="block text-sm text-gray-500 font-normal">Education Advocate</span></div>
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
