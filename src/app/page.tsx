import { Hero } from "@/components/Hero";
import { RealityStrip } from "@/components/RealityStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { ImpactGallery } from "@/components/ProgramImpactGallery";
import { GratitudeWall } from "@/components/GratitudeWall";
import { FounderStory } from "@/components/FounderStory";
import { ImpactReport } from "@/components/ImpactReport";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <RealityStrip />
      <HowItWorks />
      <ImpactGallery />
      <GratitudeWall />
      <FounderStory />
      <ImpactReport />
      <FinalCTA />
    </div>
  );
}
