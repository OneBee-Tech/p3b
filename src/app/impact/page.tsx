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
                    'impactTransformation',
                    'impactMetrics',
                    'impactTimeline',
                    'impactStories',
                    'impactHowWeMeasure',
                    'impactTransparency',
                    'impactLookingAhead',
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
            {/* Section 1: Hero */}
            {sectionsMap.impactHero && (
                <RenderSection section={sectionsMap.impactHero} layoutConfig={{ theme: 'dark' }} />
            )}

            {/* Section 2: Impact Philosophy */}
            {sectionsMap.impactPhilosophy && (
                <RenderSection section={sectionsMap.impactPhilosophy} layoutConfig={{ theme: 'white' }} />
            )}

            {/* Section 3: Representative Transformation */}
            {sectionsMap.impactTransformation && (
                <RenderSection section={sectionsMap.impactTransformation} layoutConfig={{ theme: 'gray-50' }} />
            )}

            {/* Section 4: Measurable Impact Metrics (MetricsGrid) */}
            {sectionsMap.impactMetrics && (
                <RenderSection section={sectionsMap.impactMetrics} layoutConfig={{ theme: 'white' }} />
            )}

            {/* Section 5: Educational Journey Timeline (JourneyTimeline) */}
            {sectionsMap.impactTimeline && (
                <RenderSection section={sectionsMap.impactTimeline} layoutConfig={{ theme: 'warm-bg' }} />
            )}

            {/* Section 6: Our Growing Library of Impact (StoryGrid) */}
            {sectionsMap.impactStories && (
                <RenderSection section={sectionsMap.impactStories} layoutConfig={{ theme: 'white' }} />
            )}

            {/* Section 7: How We Measure Change */}
            {sectionsMap.impactHowWeMeasure && (
                <RenderSection section={sectionsMap.impactHowWeMeasure} layoutConfig={{ theme: 'gray-50' }} />
            )}

            {/* Section 8: Behind Every Number Is A Child's Story (Transparency) */}
            {sectionsMap.impactTransparency && (
                <RenderSection section={sectionsMap.impactTransparency} layoutConfig={{ theme: 'white' }} />
            )}

            {/* Section 9: The Impact Still to Come (Future Roadmap) */}
            {sectionsMap.impactLookingAhead && (
                <RenderSection section={sectionsMap.impactLookingAhead} layoutConfig={{ theme: 'gray-50' }} />
            )}

            {/* Section 10: Final CTA */}
            {sectionsMap.impactCTA && (
                <RenderSection section={sectionsMap.impactCTA} layoutConfig={{ theme: 'dark' }} />
            )}
        </main>
    );
}
