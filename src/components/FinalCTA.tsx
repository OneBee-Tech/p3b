import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export function FinalCTA() {
    return (
        <section id="donate" className="relative py-32 md:py-40 flex items-center justify-center text-center overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-cinematic-dark z-0">
                {/* Placeholder for Cinematic Image */}
                <div className="absolute inset-0 bg-gradient-to-r from-trust-blue/80 to-cinematic-dark/90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[url('/images/hero/cta-bg.jpg')] bg-cover bg-center opacity-40 grayscale mix-blend-overlay" />
            </div>

            {/* Overlays */}
            <div className="overlay-warm z-0" />
            <div className="film-grain z-0" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
                    <Heart className="w-4 h-4 text-impact-gold fill-current" />
                    <span>Join the movement today</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight max-w-2xl mx-auto">
                    You have the power to change a life today.
                </h2>

                <p className="text-xl text-gray-200 font-body max-w-2xl mx-auto mb-12 leading-relaxed">
                    Every minute, another child loses the chance for education. Your action now can rewrite their story forever.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button variant="impact" size="lg" className="text-lg px-10 py-8 shadow-2xl shadow-impact-gold/20 transform hover:-translate-y-1 transition-transform">
                        Become a Monthly Guardian
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-10 py-8 bg-transparent border-white text-white hover:bg-white hover:text-cinematic-dark">
                        Give One-Time <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>

                <p className="text-white/40 text-sm mt-8">
                    All donations are 100% tax-deductible and secure.
                </p>
            </div>
        </section>
    );
}
