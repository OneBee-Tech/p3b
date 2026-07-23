import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

export function FounderStoryBlock({ data }: { data?: any }) {
    // If no data is passed (e.g., used on our-story directly), fallback to default structure.
    const meta = data?.metadata || {
        heading: "A Note From Our Founder",
        description: "Education is not an individual luxury, but a structural necessity. We don't just sponsor children; we empower the ecosystems that support them.",
        quote: "“We created this initiative because we believe that no child should have to forfeit their future due to circumstances they cannot control.”",
        founderImage: "/images/placeholders/founder.jpg",
        ctas: [{ label: "Read Our Story", href: "/our-story", variant: "primary" }]
    };

    return (
        <section className="bg-cinematic-dark text-white py-24 md:py-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-impact-gold/5 rounded-l-full blur-3xl opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* Portrait Col */}
                    <div className="w-full md:w-5/12 relative animate-fade-in-up">
                        <div className="relative h-[450px] w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                            <Image
                                src={meta.founderImage || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2674&auto=format&fit=crop"}
                                alt="Founder"
                                fill
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/40 to-transparent opacity-90" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="font-heading font-bold text-2xl text-white mb-1">Sarah Haider</div>
                                <div className="text-impact-gold text-sm font-bold uppercase tracking-wider">Founder & Director</div>
                            </div>
                        </div>
                    </div>

                    {/* Narrative Col */}
                    <div className="w-full md:w-7/12 text-center md:text-left">
                        <div className="inline-block md:hidden mb-6 opacity-20">
                            <Quote className="w-12 h-12 text-impact-gold mx-auto" />
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 tracking-tight leading-tight text-white animate-fade-in-up delay-100">
                            {meta.heading}
                        </h2>

                        <div className="space-y-6 font-body text-lg text-white/80 leading-relaxed mb-10 animate-fade-in-up delay-200">
                            <p>{meta.description}</p>
                            
                            {meta.quote && (
                                <blockquote className="relative">
                                    <div className="absolute -left-6 -top-4 opacity-20 hidden md:block">
                                        <Quote className="w-16 h-16 text-impact-gold" />
                                    </div>
                                    <p className="text-xl md:text-2xl font-medium text-impact-gold italic leading-relaxed relative z-10">
                                        {meta.quote}
                                    </p>
                                </blockquote>
                            )}
                        </div>

                        {meta.ctas && meta.ctas.length > 0 && (
                            <div className="animate-fade-in-up delay-300">
                                <Link
                                    href={meta.ctas[0].href}
                                    className="group inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl border border-white/20 hover:bg-white hover:text-cinematic-dark transition-all duration-300 shadow-lg hover:-translate-y-1"
                                >
                                    {meta.ctas[0].label}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
