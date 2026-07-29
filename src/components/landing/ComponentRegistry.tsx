

import { EditorialHero } from "./EditorialHero";
import { EditorialSection } from "./EditorialSection";
import { QuoteBlock } from "./QuoteBlock";
import { CardSequence } from "./CardSequence";
import { ContentGrid } from "./ContentGrid";
import { ProcessFlow } from "./ProcessFlow";
import { TrustCards } from "./TrustCards";
import { LandingCTASection } from "./LandingCTASection";
import { ContentBlock } from "./ContentBlock";

import { MetricsGrid } from "../ui/MetricsGrid";
import { JourneyTimeline } from "../ui/JourneyTimeline";
import { StoryGrid } from "../ui/StoryGrid";

// The Component Registry maps generic CMS component keys to their React implementations.
export const ComponentRegistry: Record<string, React.FC<{ data: any, layoutConfig?: any }>> = {
    hero: EditorialHero,
    editorial: EditorialSection,
    quoteBlock: QuoteBlock,
    cardSequence: CardSequence,
    contentGrid: ContentGrid,
    processFlow: ProcessFlow,
    trustCards: TrustCards,
    ctaSection: LandingCTASection,
    whyOneDollar: ContentBlock,
    contentBlock: ContentBlock,
    metricsGrid: ({ data }) => (
        <MetricsGrid 
            metrics={data.metadata?.metrics || []}
            variant={data.metadata?.variant || "impact"}
            mode={data.metadata?.mode || "launch"}
            heading={data.metadata?.heading}
            description={data.metadata?.description}
        />
    ),
    journeyTimeline: ({ data }) => (
        <JourneyTimeline 
            steps={data.metadata?.steps}
            variant={data.metadata?.variant || "education"}
            heading={data.metadata?.heading}
            description={data.metadata?.description}
        />
    ),
    storyGrid: ({ data }) => (
        <StoryGrid 
            stories={data.metadata?.stories || []}
            variant={data.metadata?.variant || "stories"}
            heading={data.metadata?.heading}
            description={data.metadata?.description}
        />
    ),
};

/**
 * RenderSection is a helper to safely render a component from the registry.
 */
export function RenderSection({ section, layoutConfig }: { section: any, layoutConfig?: any }) {
    const componentKey = section?.metadata?.component;
    
    if (!componentKey) {
        console.warn(`Section ${section.sectionKey} is missing a component key in metadata.`);
        return null;
    }

    const Component = ComponentRegistry[componentKey];

    if (!Component) {
        console.warn(`Component '${componentKey}' not found in registry.`);
        return null;
    }

    return <Component data={section} layoutConfig={layoutConfig} />;
}
