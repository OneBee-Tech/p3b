import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ContextRibbon } from "@/components/ContextRibbon";
import { SocialShare } from "@/components/SocialShare";
import type { Metadata, ResolvingMetadata } from "next";

export const revalidate = 60; // 1-minute cache

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;

    const story = await prisma.impactStory.findUnique({
        where: { id: id, status: 'PUBLISHED' },
        select: { title: true, content: true, imageUrl: true }
    });

    if (!story) return { title: 'Story Not Found' };

    const rawDescription = story.content.substring(0, 160).trim();
    const description = rawDescription.length === 160 ? `${rawDescription}...` : rawDescription;

    return {
        title: story.title,
        description,
        openGraph: {
            title: story.title,
            description,
            type: 'article',
            images: story.imageUrl ? [story.imageUrl] : ['/og-image-impact.jpg'],
        }
    };
}

export default async function StoryPage({ params }: Props) {
    const { id: storyId } = await params;

    const story = await prisma.impactStory.findUnique({
        where: { id: storyId }
    });

    if (!story || story.status !== "PUBLISHED") {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-end">
                {/* Background Image */}
                <div className="absolute inset-0 bg-cinematic-dark">
                    {story.imageUrl ? (
                        <Image
                            src={story.imageUrl}
                            alt={story.title}
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    ) : (
                        <div className="flex bg-cinematic-dark items-center justify-center h-full opacity-60">
                            <Globe className="w-32 h-32 text-white/5" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinematic-dark via-cinematic-dark/60 to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <Link href="/impact" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Impact Gallery
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-impact-gold text-sm font-bold uppercase tracking-wide">
                            <Calendar className="w-4 h-4" /> {new Date(story.publishAt || story.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-4">
                        {story.title}
                    </h1>
                </div>
            </section>

            <ContextRibbon />

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                    <div className="prose prose-lg max-w-none text-gray-700 font-body leading-relaxed whitespace-pre-wrap">
                        {story.content}

                        <div className="mt-12 pt-8 border-t border-gray-100 italic text-gray-500 text-sm flex flex-col gap-2">
                            <p className="font-medium text-gray-400">
                                <span className="text-trust-blue font-bold tracking-wider uppercase text-xs">Verified Impact Report</span><br />
                                This impact story has been verified by regional field coordinators and published in accordance with our safeguarding and privacy ethics.
                            </p>
                        </div>

                        <div className="mt-8">
                            <SocialShare title={story.title} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
