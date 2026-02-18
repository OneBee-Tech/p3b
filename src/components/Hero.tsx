import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Users, FileText, HeartHandshake } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-center items-center text-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* Placeholder for documentary image - User to replace */}
                <div className="absolute inset-0 bg-gray-900" />
                {/* 
            <Image 
              src="/images/hero/documentary-bg.jpg" 
              alt="Students in a classroom" 
              fill 
              className="object-cover"
              priority
            />
         */}
            </div>

            {/* Cinematic Overlay Stack */}
            <div className="overlay-cinematic z-10" />
            <div className="overlay-warm z-10" />
            <div className="vignette z-10" />
            <div className="film-grain z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-10vh]">
                <div className="animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
                        Global Education Initiative
                    </span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-lg">
                        Empower the Next <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                            Generation of Leaders
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-body max-w-2xl mx-auto mb-10 leading-relaxed text-shadow-sm">
                        Millions of children lack access to quality education. Your support builds schools, trains teachers, and transforms communities forever.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Button variant="impact" size="lg" className="text-lg px-8 shadow-xl shadow-impact-gold/10">
                            Donate Monthly
                        </Button>
                        <Button variant="outline" size="lg" className="text-lg px-8 bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                            View Our Impact <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Trust Infrastructure Strip */}
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-cinematic-dark/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white/80 text-xs md:text-sm">
                        <div className="flex items-center justify-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            <span>Verified Charity Partner</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Users className="w-5 h-5 text-impact-gold" />
                            <span>100% Secure Donation</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <FileText className="w-5 h-5 text-blue-400" />
                            <span>Tax Deductible Receipts</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <HeartHandshake className="w-5 h-5 text-pink-400" />
                            <span>Transparency Report 2025</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Cue */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 animate-pulse-slow">
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
            </div>
        </section>
    );
}
