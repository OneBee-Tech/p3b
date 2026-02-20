import Image from "next/image";
import { MapPin, Users, Calendar, ArrowUpRight } from "lucide-react";

const impactStories = [
    {
        id: 1,
        region: "Sindh, Pakistan",
        school: "Al-Khair Primary School",
        year: "2024",
        impact: "450 Students",
        image: "/images/impact/story1.jpg", // Placeholder
    },
    {
        id: 2,
        region: "Rural Punjab",
        school: "Hope Academy",
        year: "2023",
        impact: "320 Students",
        image: "/images/impact/story2.jpg", // Placeholder
    },
    {
        id: 3,
        region: "Balochistan",
        school: "Community Learning Center",
        year: "2025",
        impact: "New Connection",
        image: "/images/impact/story3.jpg", // Placeholder
    },
];

export function ImpactGallery() {
    return (
        <section id="impact" className="py-24 bg-white text-cinematic-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="block text-trust-blue font-bold tracking-wider text-sm uppercase mb-2">Evidence of Impact</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold">Real Stories, Real Change.</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 max-w-md">
                            We believe in radical transparency. See exactly where your donations go.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {impactStories.map((story) => (
                        <div key={story.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                            {/* Image Placeholder */}
                            <div className="h-[400px] w-full bg-gray-200 relative">
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white/30 font-heading text-lg">
                                    {story.school} - Documentary Image
                                </div>
                                {/* 
                     <Image 
                       src={story.image} 
                       alt={`Students at ${story.school}`} 
                       fill 
                       className="object-cover group-hover:scale-105 transition-transform duration-700" 
                     />
                   */}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                <div className="flex items-center gap-2 text-impact-gold text-xs font-bold uppercase tracking-wide mb-2">
                                    <MapPin className="w-4 h-4" /> {story.region}
                                </div>
                                <h3 className="text-2xl font-heading font-bold mb-4">{story.school}</h3>

                                <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 text-sm">
                                    <div>
                                        <span className="block text-gray-400 text-xs uppercase mb-1">Year Supported</span>
                                        <div className="flex items-center gap-2 font-medium">
                                            <Calendar className="w-4 h-4 text-emerald-400" /> {story.year}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400 text-xs uppercase mb-1">Lives Changed</span>
                                        <div className="flex items-center gap-2 font-medium">
                                            <Users className="w-4 h-4 text-blue-400" /> {story.impact}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Reveal Action */}
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <button className="text-white hover:text-impact-gold font-bold flex items-center gap-2 text-sm">
                                        Read Their Story <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
