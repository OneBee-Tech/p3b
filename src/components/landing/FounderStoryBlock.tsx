import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

export function FounderStoryBlock() {
    return (
        <section className="bg-cinematic-dark text-white py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-impact-gold/5 rounded-l-full blur-3xl opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Portrait Col */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative h-[500px] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2674&auto=format&fit=crop"
                                alt="Founder of OneDollarOneChild standing in front of a school"
                                fill
                                loading="lazy"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-6 left-6">
                                <div className="font-heading font-bold text-2xl">Sarah Jenkins</div>
                                <div className="text-impact-gold text-sm font-bold uppercase tracking-wider">Founder & Executive Director</div>
                            </div>
                        </div>
                        {/* Decorative Quote Mark */}
                        <div className="absolute -top-6 -left-6 md:-left-12 opacity-10 pointer-events-none">
                            <Quote className="w-32 h-32 text-white" />
                        </div>
                    </div>

                    {/* Narrative Col */}
                    <div className="lg:col-span-7">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight leading-tight text-impact-gold">
                            "We realized every child needed a champion."
                        </h2>

                        <div className="space-y-6 text-white/80 font-body text-lg leading-relaxed mb-10">
                            <p>
                                Ten years ago, we realized that an isolated approach to child support wasn't enough. We recognized that true impact required a holistic sponsorship model that guaranteed access to education, supplies, and wellbeing services.
                            </p>
                            <p>
                                Every child deserves an environment where they can thrive, learn, and build a secure foundation for their future.
                            </p>
                            <p className="text-white font-medium border-l-4 border-impact-gold pl-6 py-2">
                                That's why we fundamentally changed our architecture. We connected everyday donors directly with a child's educational journey, ensuring verified and stable support through dedicated education partners.
                            </p>
                        </div>

                        <Link
                            href="/our-story"
                            className="group inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300"
                        >
                            Read Our Full Origin Story
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
