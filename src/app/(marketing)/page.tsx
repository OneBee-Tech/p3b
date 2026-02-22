import { Metadata } from 'next';
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
import { TrustBadgeStrip } from '@/components/TrustBadgeStrip';

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

export default function MarketingLandingPage() {
    return (
        <>
            {/* JSON-LD Structured Data Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Layer 1: Emotional Acquisition (Landing) */}
            <EmergencyCampaignBanner />

            {/* 🧭 LANDING RENDER ORDER */}
            {/* 1. Emotion */}
            <HeroAcquisition />

            {/* Sticky Conversion Capture Layer */}
            <StickyDonateRail />

            {/* 2. Action (Structured Tiers) */}
            <SponsorshipImpactTiers />

            {/* 3. Logic (Data Visualization) */}
            <ImpactMetricsStrip />

            {/* 4. Process (Ecosystem Explaination) */}
            <HowItWorksFlow />

            {/* 5. Proof (Storytelling Hook) */}
            <ImpactGalleryPreview />

            {/* 6. Human Connection (Founder Story) */}
            <FounderStoryBlock />

            {/* Actionable Transparency Proof */}
            <DashboardTransparencyPreview />

            {/* 7. Final Conversion Hook */}
            <LandingCTASection />

            {/* 8. Trust Visibility Layer */}
            {/* (Excluding global TrustBadgeStrip because it's rendered globally in layout.tsx but the user instructed "Reuse global TrustBadgeStrip.tsx Placement: Landing -> Above footer; Institutional pages -> Pre-footer.") */}
            {/* Layout already renders TrustBadgeStrip globally. We'll leave it out here to avoid duplication, as Layout.tsx places it before Footer. */}
        </>
    );
}
