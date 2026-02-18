import Image from "next/image";
import { Quote } from "lucide-react";

export function FounderStory() {
    return (
        <section id="stories" className="py-24 bg-white text-cinematic-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Image Frame */}
                    <div className="relative order-2 md:order-1">
                        <div className="aspect-[3/4] bg-gray-200 relative rounded-sm overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                            {/* Placeholder Image */}
                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 font-heading text-lg">
                                Founder Portrait with Students
                            </div>
                            {/* 
                   <Image 
                     src="/images/founder/founder.jpg" 
                     alt="Founder visiting a school" 
                     fill 
                     className="object-cover sepia-[.3]" 
                   />
                 */}
                            {/* Signature Overlay */}
                            <div className="absolute bottom-6 right-6 font-quote text-2xl text-white drop-shadow-md opacity-80 rotate-[-5deg]">
                                Ali Hassan
                            </div>
                        </div>
                        <div className="absolute -z-10 top-4 -left-4 w-full h-full border-2 border-trust-blue/20 rounded-sm" />
                    </div>

                    {/* Editorial Content */}
                    <div className="order-1 md:order-2">
                        <span className="block text-trust-blue font-bold tracking-wider text-sm uppercase mb-4">The Origin Story</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                            "I couldn't walk away."
                        </h2>

                        <div className="space-y-6 text-lg text-gray-700 font-body leading-relaxed">
                            <p>
                                Ten years ago, I visited a remote village in Sindh. I expected to see poverty. What I saw instead was <span className="font-bold text-cinematic-dark">untapped brilliance.</span>
                            </p>
                            <p>
                                Children wrote in the sand because they had no paper. They learned under the scorching sun because they had no roof. Yet, their eyes burned with a hunger for knowledge I had never seen before.
                            </p>

                            <div className="relative pl-8 border-l-4 border-impact-gold py-2 my-8">
                                <Quote className="absolute top-0 left-0 -ml-6 -mt-4 text-impact-gold/20 w-12 h-12" />
                                <p className="font-quote text-2xl italic text-cinematic-dark">
                                    "We aren't just building schools. We are building the cathedrals of the future, one brick at a time."
                                </p>
                            </div>

                            <p>
                                That day, I made a promise. I would not stop until every child, in every village, had a seat in a classroom. Today, 58 schools later, that promise is kept by people like you.
                            </p>

                            <div className="pt-8 mt-8 border-t border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full" /> {/* Small avatar */}
                                <div>
                                    <p className="font-bold text-cinematic-dark">Ali Hassan</p>
                                    <p className="text-sm text-gray-500">Founder & Executive Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
