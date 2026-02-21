import { Metadata } from 'next';
import { EmergencyCampaignBanner } from '@/components/landing/EmergencyCampaignBanner';
import { HeroAcquisition } from '@/components/landing/HeroAcquisition';
import { StickyDonateRail } from '@/components/landing/StickyDonateRail';
import { PricingContributionTiers } from '@/components/landing/PricingContributionTiers';
import { ImpactMetricsStrip } from '@/components/landing/ImpactMetricsStrip';
import { HowItWorksFlow } from '@/components/landing/HowItWorksFlow';
import { ImpactGalleryPreview } from '@/components/landing/ImpactGalleryPreview';
import { FounderStoryBlock } from '@/components/landing/FounderStoryBlock';
import { DashboardTransparencyPreview } from '@/components/landing/DashboardTransparencyPreview';
import { LandingCTASection } from '@/components/landing/LandingCTASection';
import { TrustBadgeStrip } from '@/components/TrustBadgeStrip';

export const metadata: Metadata = {
    title: 'One Dollar. One Child. One Future. | OneDollarOneChild',
    description: 'Support community-led education initiatives transforming entire regions through pooled funding.',
    openGraph: {
        title: 'One Dollar. One Child. One Future. | OneDollarOneChild',
        description: 'Support community-led education initiatives transforming entire regions through pooled funding.',
        images: [{ url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop' }],
    }
};

export default function MarketingLandingPage() {
    return (
        <>
            {/* Layer 1: Emotional Acquisition (Landing) */}
            <EmergencyCampaignBanner />

            {/* 🧭 LANDING RENDER ORDER */}
            {/* 1. Emotion */}
            <HeroAcquisition />

            {/* Sticky Conversion Capture Layer */}
            <StickyDonateRail />

            {/* 2. Action (Structured Tiers) */}
            <PricingContributionTiers />

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
