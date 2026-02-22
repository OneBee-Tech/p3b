import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";

export function ImpactGalleryPreview() {
    const previewStories = [
        {
            src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2670&auto=format&fit=crop",
            alt: "Educational supplies and notebooks",
            region: "Kigali, Rwanda",
            title: "The Digital Jumpstart",
            impact: "120 Children Connected",
        },
        {
            src: "https://images.unsplash.com/photo-1427504494785-3a9a27b8bfbc?q=80&w=2670&auto=format&fit=crop",
            alt: "Clean and safe learning environments",
            region: "Nairobi, Kenya",
            title: "Safe Learning Environments",
            impact: "New Classrooms Furnished",
        },
        {
            src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2670&auto=format&fit=crop",
            alt: "Stack of educational books",
            region: "Accra, Ghana",
            title: "Empowering Through Literacy",
            impact: "Learning Materials Provided",
        }
    ];

    return (
        <section className="bg-warm-bg py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-heading font-bold text-cinematic-dark mb-4 tracking-tight">
                            See the impact in action.
                        </h2>
                        <p className="text-lg text-gray-600 font-body leading-relaxed">
                            Every dollar changes a life. Explore exactly how child sponsorships provide education, supplies, and wellbeing, verified by our transparent impact reporting.
                        </p>
                    </div>
                    <Link
                        href="/stories"
                        className="group inline-flex items-center gap-2 text-trust-blue font-bold px-6 py-3 rounded-full bg-blue-50 hover:bg-trust-blue hover:text-white transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md"
                    >
                        <ImageIcon className="w-5 h-5" />
                        Explore All Stories
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {previewStories.map((story, index) => (
                        <Link
                            href="/stories"
                            key={index}
                            className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 block"
                        >
                            <Image
                                src={story.src}
                                alt={story.alt}
                                fill
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Rich Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark/90 via-cinematic-dark/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                            {/* Privacy Disclaimer */}
                            <div className="absolute top-4 right-4 bg-cinematic-dark/80 backdrop-blur-md rounded-lg p-2 border border-white/20 text-[10px] text-white/80 max-w-[200px] text-right z-20">
                                Images are representative. Child identities are protected for safety.
                            </div>

                            {/* Card Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider w-fit mb-3 border border-white/20">
                                    {story.region}
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">
                                    {story.title}
                                </h3>
                                <p className="text-impact-gold font-medium text-sm flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    {story.impact}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
