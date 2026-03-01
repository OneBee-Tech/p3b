import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function ImpactGalleryPreview() {
    const previewStories = await prisma.impactStory.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishAt: "desc" },
        take: 3
    });

    if (previewStories.length === 0) return null;

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
                    {previewStories.map((story) => (
                        <Link
                            href={`/stories/${story.id}`}
                            key={story.id}
                            className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 block bg-gray-900"
                        >
                            {story.imageUrl && (
                                <Image
                                    src={story.imageUrl}
                                    alt={story.title}
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            )}
                            {/* Rich Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark/90 via-cinematic-dark/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                            {/* Card Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider w-fit mb-3 border border-white/20">
                                    Verified Impact
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">
                                    {story.title}
                                </h3>
                                <p className="text-impact-gold font-medium text-sm flex items-center gap-2 line-clamp-1">
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    Read Full Report
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
