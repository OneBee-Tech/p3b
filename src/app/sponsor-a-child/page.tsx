import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { getGlobalSettings } from "@/lib/services/globalSettingsService";
import { RenderSection } from "@/components/landing/ComponentRegistry";
import { ProfileGrid } from "@/components/ui/ProfileGrid";
import { LandingCTASection } from "@/components/landing/LandingCTASection";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGlobalSettings();
    return {
        title: `Sponsor a Child - ${settings.organizationName}`,
        description: "Every child has a dream. Together, we can help protect it. Browse child profiles and support a child's education for just $1 a day.",
        openGraph: {
            title: `Sponsor a Child - ${settings.organizationName}`,
            description: "Every child has a dream. Together, we can help protect it. Support a child's education for just $1 a day.",
            type: "website",
        },
    };
}

export default async function SponsorPage() {
    // 1. Fetch CMS sections for Sponsor Page
    const sections = await prisma.homepageSection.findMany({
        where: {
            sectionKey: {
                in: [
                    'sponsorHero',
                    'sponsorPoeticMission',
                    'sponsorProvides',
                    'sponsorJourney',
                    'sponsorTrust',
                    'sponsorClosing'
                ]
            },
            isActive: true
        }
    });

    const sectionsMap = sections.reduce((acc: any, sec) => {
        acc[sec.sectionKey] = sec;
        return acc;
    }, {});

    // 2. Fetch RegistryChild records from DB
    const dbChildren = await prisma.registryChild.findMany({
        where: {
            deletedAt: null,
            isArchived: false,
        },
        orderBy: [
            { createdAt: "desc" }
        ],
        take: 36,
    });

    // Format profiles for ProfileGrid
    const profiles = dbChildren.map((child) => ({
        id: child.id,
        slug: child.slug || child.id,
        displayName: child.displayName,
        age: child.age,
        region: child.region,
        educationLevel: child.educationLevel,
        currentGrade: child.currentGrade,
        schoolType: child.schoolType,
        dream: child.dream,
        shortIntro: child.shortIntro,
        avatarIllustrationUrl: child.avatarIllustrationUrl,
        status: child.status,
        safeguardingReviewStatus: child.safeguardingReviewStatus,
        impactStorySlug: child.impactStorySlug,
    }));

    return (
        <main className="min-h-screen bg-white">
            {/* Section 1: Hero */}
            {sectionsMap.sponsorHero && (
                <RenderSection section={sectionsMap.sponsorHero} layoutConfig={{ theme: 'dark' }} />
            )}

            {/* Section 2: Poetic Mission Section */}
            {sectionsMap.sponsorPoeticMission && (
                <RenderSection section={sectionsMap.sponsorPoeticMission} layoutConfig={{ theme: 'white' }} />
            )}

            {/* Section 3: Meet the Children Directory Grid */}
            <ProfileGrid
                profiles={profiles}
                variant="children"
                heading="Meet the Children"
                description="Every child has a unique story, a dream, and the potential to build a brighter future through education."
                showSafeguardingNotice={true}
            />

            {/* Section 4: What Your Sponsorship Provides */}
            {sectionsMap.sponsorProvides && (
                <RenderSection section={sectionsMap.sponsorProvides} layoutConfig={{ theme: 'gray-50' }} />
            )}

            {/* Section 5: Concise Sponsorship Journey */}
            {sectionsMap.sponsorJourney && (
                <RenderSection section={sectionsMap.sponsorJourney} layoutConfig={{ theme: 'white' }} />
            )}

            {/* Section 6: Strengthen Trust Section */}
            {sectionsMap.sponsorTrust && (
                <RenderSection section={sectionsMap.sponsorTrust} layoutConfig={{ theme: 'light' }} />
            )}

            {/* Section 7: Mission Closing */}
            {sectionsMap.sponsorClosing && (
                <RenderSection section={sectionsMap.sponsorClosing} layoutConfig={{ theme: 'dark' }} />
            )}

            {/* Section 8: Final CTA */}
            <LandingCTASection 
                data={{
                    metadata: {
                        heading: "Every Child Has Potential.",
                        description: "One sponsorship can help unlock a lifetime of opportunity. Education changes futures. Communities grow stronger. Hope becomes reality.",
                        ctas: [
                            { label: "Meet the Children", href: "#meet-children", variant: "primary" },
                            { label: "Learn How Sponsorship Works", href: "/how-it-works", variant: "secondary" }
                        ]
                    }
                }}
            />
        </main>
    );
}
