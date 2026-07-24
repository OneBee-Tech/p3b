import { prisma } from "@/lib/prisma";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { Metadata } from "next";
import { RenderSection } from "@/components/landing/ComponentRegistry";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `How It Works - ${settings.organizationName}`,
        description: `Learn how your $1 a day contribution creates lasting change through ${settings.organizationName}'s transparent ecosystem.`,
        openGraph: {
            title: `How It Works - ${settings.organizationName}`,
            description: `Learn how your $1 a day contribution creates lasting change through ${settings.organizationName}'s transparent ecosystem.`,
            type: "website",
        },
    };
}

const PAGE_LAYOUT: Record<string, { theme: string; [key: string]: any }> = {
    hiwHero: { theme: 'dark' },
    hiwJourneyOverview: { theme: 'light' },
    hiwChapter1: { theme: 'white' },
    hiwChapter2: { theme: 'gray-50' },
    hiwVisualBreak: { theme: 'dark' },
    hiwChapter3: { theme: 'white' },
    hiwSupports: { theme: 'dark' },
    hiwReceives: { theme: 'gray-50' },
    hiwTransparency: { theme: 'light' },
    hiwClosing: { theme: 'dark' },
    hiwCTA: { theme: 'dark' }
};

export default async function HowItWorksPage() {
    const rawSections = await prisma.homepageSection.findMany({
        where: { sectionKey: { startsWith: 'hiw' } }
    });

    const sections = rawSections
        .filter(s => s?.metadata && typeof (s.metadata as any).order === 'number' && PAGE_LAYOUT.hasOwnProperty(s.sectionKey))
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
            {sections.map((section: any) => {
                const layoutConfig = PAGE_LAYOUT[section.sectionKey] || { theme: 'white' };
                return (
                    <RenderSection 
                        key={section.sectionKey} 
                        section={section} 
                        layoutConfig={layoutConfig} 
                    />
                );
            })}
        </main>
    );
}
