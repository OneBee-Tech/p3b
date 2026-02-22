import Image from "next/image";

export function RealityStrip() {
    return (
        <section className="bg-cinematic-charcoal text-white py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* Emotional Narrative */}
                    <div className="order-2 lg:order-1">
                        <div className="w-16 h-1 bg-impact-gold mb-8" />
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight max-w-[600px]">
                            Every child deserves more than just survival.
                        </h2>
                        <p className="text-lg text-gray-300 font-body leading-relaxed mb-8">
                            In the remote villages we serve, education is not a right—it’s a rare privilege. Without schools, generations are trapped in a cycle of poverty that feels impossible to break.
                        </p>
                        <p className="text-lg text-gray-300 font-body leading-relaxed">
                            But when you place a book in a child’s hand, you don’t just teach them to read. You give them the power to rewrite their entire future.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8 mt-12 border-t border-white/10 pt-8">
                            <div>
                                <span className="block text-4xl md:text-5xl font-bold text-white mb-2 font-heading">58M</span>
                                <span className="text-sm text-gray-400 uppercase tracking-wider">Children out of school</span>
                            </div>
                            <div>
                                <span className="block text-4xl md:text-5xl font-bold text-impact-gold mb-2 font-heading">100%</span>
                                <span className="text-sm text-gray-400 uppercase tracking-wider">Potential wasted</span>
                            </div>
                        </div>
                    </div>

                    {/* Cinematic B&W Image */}
                    <div className="order-1 lg:order-2 relative h-[500px] w-full group">
                        <div className="absolute inset-0 bg-gray-800 rounded-sm overflow-hidden grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-1000 ease-out">
                            {/* Placeholder - User to replace */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 border border-white/10">
                                <p className="text-white/20 font-heading">Cinematic Portrait</p>
                            </div>
                            {/* 
                 <Image 
                   src="/images/impact/reality-strip.jpg" 
                   alt="Child looking at a book" 
                   fill 
                   className="object-cover"
                 />
                */}
                        </div>
                        {/* Frame decoration */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border border-white/10 -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
