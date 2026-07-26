import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { RenderSection } from "@/components/landing/ComponentRegistry";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Our Impact - ${settings.organizationName}`,
        description: "Documenting real educational progress, transparent reporting, and the lives being transformed through sponsorship.",
        openGraph: {
            title: `Our Impact - ${settings.organizationName}`,
            description: "Documenting real educational progress, transparent reporting, and the lives being transformed through sponsorship.",
            type: "website",
        },
    };
}

export default async function ImpactPage() {
    // Fetch CMS sections for Impact Page
    const sections = await prisma.homepageSection.findMany({
        where: {
            sectionKey: {
                in: [
                    'impactHero',
                    'impactPhilosophy',
                    'impactTimeline',
                    'impactEmotionalBreak',
                    'impactStories',
                    'impactMetrics',
                    'impactCTA'
                ]
            },
            isActive: true
        }
    });

    const sectionsMap = sections.reduce((acc: any, sec) => {
        acc[sec.sectionKey] = sec;
        return acc;
    }, {});

    return (
        <main className="min-h-screen bg-white">
            {/* Experience 1: Cinematic Hero (Dark) */}
            {sectionsMap.impactHero && (
                <RenderSection section={sectionsMap.impactHero} layoutConfig={{ theme: 'dark' }} />
            )}

            {/* Experience 2: Why We Exist & 3 Promises (White Canvas) */}
            {sectionsMap.impactPhilosophy && (
                <RenderSection section={sectionsMap.impactPhilosophy} layoutConfig={{ theme: 'white' }} />
            )}

            {/* Experience 3: Educational Journey Flow (Warm Canvas) */}
            {sectionsMap.impactTimeline && (
                <RenderSection section={sectionsMap.impactTimeline} layoutConfig={{ theme: 'warm-bg' }} />
            )}

            {/* Experience 4: Emotional Full-Bleed Interlude (Pure Pause - Dark Image) */}
            {sectionsMap.impactEmotionalBreak && (
                <RenderSection section={sectionsMap.impactEmotionalBreak} layoutConfig={{ theme: 'dark' }} />
            )}

            {/* Experience 5: Stories Yet To Be Written (White Canvas) */}
            {sectionsMap.impactStories && (
                <RenderSection section={sectionsMap.impactStories} layoutConfig={{ theme: 'white' }} />
            )}

            {/* Experience 6: Transparency Commitments & Final Cinematic CTA (Dark Canvas) */}
            {sectionsMap.impactMetrics && (
                <RenderSection section={sectionsMap.impactMetrics} layoutConfig={{ theme: 'dark' }} />
            )}

            {sectionsMap.impactCTA && (
                <RenderSection section={sectionsMap.impactCTA} layoutConfig={{ theme: 'dark' }} />
            )}
        </main>
    );
}
