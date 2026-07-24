import { prisma } from "@/lib/prisma";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { Metadata } from "next";
import { RenderSection } from "@/components/landing/ComponentRegistry";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Our Story - ${settings.organizationName}`,
        description: "A small idea with the power to build big futures. Learn about the story, values, and mission behind One Dollar. One Child. One Future.",
        openGraph: {
            title: `Our Story - ${settings.organizationName}`,
            description: "A small idea with the power to build big futures.",
            type: "website",
        },
    };
}

export default async function OurStoryPage() {
    // Fetch all sections that start with 'story' (or a specific page identifier in a real CMS)
    // For now, we'll fetch all and filter by sectionKey starting with 'story'
    const rawSections = await prisma.homepageSection.findMany({
        where: { sectionKey: { startsWith: 'story' } }
    });

    // Sort them by the order field in metadata
    const sections = rawSections
        .filter(s => s?.metadata && typeof (s.metadata as any).order === 'number')
        .sort((a, b) => {
            const orderA = (a.metadata as any).order || 0;
            const orderB = (b.metadata as any).order || 0;
            return orderA - orderB;
        });

    if (!sections.length) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {sections.map((section: any) => (
                <RenderSection key={section.sectionKey} section={section} />
            ))}
        </main>
    );
}
