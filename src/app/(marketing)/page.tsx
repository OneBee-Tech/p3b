import { Metadata } from 'next';
import { getAllHomepageSections } from '@/lib/services/contentService';
import { EmergencyCampaignBanner } from '@/components/landing/EmergencyCampaignBanner';
import { HeroAcquisition } from '@/components/landing/HeroAcquisition';
import { StickyDonateRail } from '@/components/landing/StickyDonateRail';
import { SponsorshipImpactTiers } from '@/components/landing/SponsorshipImpactTiers';
import { ImpactMetricsStrip } from '@/components/landing/ImpactMetricsStrip';
import { HowItWorksFlow } from '@/components/landing/HowItWorksFlow';
import { ImpactGalleryPreview } from '@/components/landing/ImpactGalleryPreview';
import { FounderStoryBlock } from '@/components/landing/FounderStoryBlock';
import { DashboardTransparencyPreview } from '@/components/landing/DashboardTransparencyPreview';
import { LandingCTASection } from '@/components/landing/LandingCTASection';
import { LandingNewsletterCTA } from '@/components/landing/LandingNewsletterCTA';

export const metadata: Metadata = {
    title: 'Sponsor a Child for Just $1 a Day | OneDollarOneChild',
    description: 'Support a child’s education, supplies, and future. Even one dollar a day creates lasting impact.',
    openGraph: {
        title: 'Sponsor a Child for Just $1 a Day | OneDollarOneChild',
        description: 'Support a child’s education, supplies, and future. Even one dollar a day creates lasting impact.',
        images: [{ url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop' }],
    }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'OneDollarOneChild',
    description: 'Child Education Sponsorship',
    url: 'https://onedollaronechild.org',
    areaServed: 'Global',
    serviceType: 'Child Education Sponsorship'
};

import { ContentBlock } from '@/components/landing/ContentBlock';
import { TrustBadgeStrip } from '@/components/TrustBadgeStrip';

const sectionComponents: Record<string, React.FC<any>> = {
    'emergency-banner': EmergencyCampaignBanner,
    'hero': HeroAcquisition,
    'whyOneDollar': ContentBlock, // Grid variant will be used internally
    'sponsorJourney': SponsorshipImpactTiers,
    'sponsorshipProcess': HowItWorksFlow,
    'founderStory': FounderStoryBlock,
    'transparency': DashboardTransparencyPreview,
    'cta': LandingCTASection,
    'sticky-donate': StickyDonateRail,
    'trustBar': TrustBadgeStrip, // Keeping in case we use it as a standalone banner
};

export default async function MarketingLandingPage() {
    // Fetch sections dynamically from content service
    const sectionsData = await getAllHomepageSections();
    
    // Convert record to array and sort by order metadata (default to 0 if undefined)
    const sections = Object.values(sectionsData).sort((a, b) => {
        const orderA = typeof a.metadata?.order === 'number' ? a.metadata.order : 0;
        const orderB = typeof b.metadata?.order === 'number' ? b.metadata.order : 0;
        return orderA - orderB;
    });

    return (
        <>
            {/* JSON-LD Structured Data Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Dynamically render CMS-driven sections */}
            {sections.map(section => {
                const Component = sectionComponents[section.sectionKey];
                
                if (!Component) {
                    return null; // Gracefully ignore unknown section keys
                }
                
                // For the CTA section, render the Newsletter section right before it so CTA stays at the very end
                if (section.sectionKey === 'cta') {
                    return (
                        <div key={section.sectionKey}>
                            <LandingNewsletterCTA />
                            <Component data={section} />
                        </div>
                    );
                }

                return <Component key={section.sectionKey} data={section} />;
            })}

            {/* Fallback rendering if no sections are returned from the database (Empty state testing) */}
            {sections.length === 0 && (
                <div className="py-24 text-center">
                    <p className="text-slate-500 font-medium">Homepage sections are currently being updated.</p>
                </div>
            )}
        </>
    );
}
