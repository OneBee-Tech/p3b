import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, Calendar } from "lucide-react";
import prisma from "@/lib/prisma";

export async function ImpactGallery() {
    const dbStories = await prisma.impactStory.findMany({
        where: {
            status: "PUBLISHED",
            OR: [
                { publishAt: { lte: new Date() } },
                { publishAt: null }
            ]
        },
        orderBy: { createdAt: "desc" }
    });

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
                    {dbStories.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
                            <Globe className="w-12 h-12 text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-cinematic-dark mb-2">Impact Data Synchronizing</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Our field agents are compiling the latest verified stories of change from our partnered regions. Check back soon.
                            </p>
                        </div>
                    ) : (
                        dbStories.map((story: any) => (
                            <div key={story.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                                {/* Image / Media Banner */}
                                <div className="h-[400px] w-full bg-cinematic-dark relative flex items-center justify-center">
                                    {story.imageUrl ? (
                                        <img
                                            src={story.imageUrl}
                                            alt={story.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                                        />
                                    ) : (
                                        <Globe className="w-16 h-16 text-white/10" />
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                    {/* Privacy Disclaimer */}
                                    <div className="absolute top-4 right-4 bg-cinematic-dark/80 backdrop-blur-md rounded-lg p-2 border border-white/20 text-[10px] text-white/80 max-w-[200px] text-right z-20">
                                        Verified NGO Field Report
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                    <div className="flex items-center gap-2 text-impact-gold text-xs font-bold uppercase tracking-wide mb-2">
                                        <Calendar className="w-4 h-4" /> {new Date(story.createdAt).toLocaleDateString()}
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold mb-4 line-clamp-2">{story.title}</h3>

                                    <div className="border-t border-white/20 pt-4 text-sm">
                                        <p className="text-white/80 line-clamp-3 leading-relaxed">
                                            {story.content}
                                        </p>
                                    </div>

                                    {/* Hover Reveal Action */}
                                    <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <Link href={`/stories/${story.id}`} className="text-white hover:text-impact-gold font-bold flex items-center gap-2 text-sm">
                                            Read Full Report <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Compliance Notice */}
                <div className="mt-12 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm font-medium text-gray-400">
                        Stories are published with guardian consent and safeguarding approval.
                    </p>
                </div>
            </div>
        </section>
    );
}
