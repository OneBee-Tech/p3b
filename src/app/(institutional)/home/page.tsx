import { Hero } from "@/components/Hero";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FinalCTA />
    </div>
  );
}
