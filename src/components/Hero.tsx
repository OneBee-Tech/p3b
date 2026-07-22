import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, CheckCircle, FileText, HeartHandshake } from "lucide-react";
import { HomepageSectionData } from "@/lib/services/contentService";

export interface HeroProps {
  initialData?: HomepageSectionData | null;
}

export function Hero({ initialData }: HeroProps) {
  // Default values matching the exact client audit document
  const headline = initialData?.title || "One Dollar. One Child. One Future.";
  const supportingHeadline = (initialData?.metadata as { supportingHeadline?: string })?.supportingHeadline || 
    "Give just $1 a day and help a child receive the education they deserve.";
  const bodyText = initialData?.content || 
    "One dollar may not buy a cup of coffee, a snack or even a small daily treat. But in carefully selected communities, your $1 a day can help cover a child’s essential education costs—including school fees, books, stationery, uniforms and shoes.";

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden flex flex-col justify-center items-center text-center bg-cinematicDark text-white py-20">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-trustBlue/20 via-cinematicDark/80 to-cinematicDark" />

      {/* Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <span className="inline-block py-1.5 px-4 rounded-full bg-trustBlue/20 border border-trustBlue/40 text-impactGold text-xs md:text-sm font-semibold tracking-wide uppercase mb-2">
            Give $1 a Day Initiative
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight max-w-4xl leading-tight">
            {headline}
          </h1>

          <p className="text-xl md:text-2xl text-impactGold font-semibold font-heading max-w-3xl mx-auto">
            {supportingHeadline}
          </p>

          <p className="text-base md:text-lg text-slate-300 font-body max-w-2xl mx-auto leading-relaxed pt-2">
            {bodyText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              asChild
              size="lg"
              className="text-base font-bold px-8 py-6 rounded-full bg-impactGold text-cinematicDark hover:bg-impactGold/90 shadow-xl shadow-impactGold/20"
            >
              <Link href="/checkout">Give $1 a Day</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base font-semibold px-8 py-6 rounded-full bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Link href="/how-it-works">
                See How Sponsorship Works <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Infrastructure Strip */}
      <div className="relative z-20 mt-16 w-full border-t border-white/10 bg-cinematicCharcoal/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-white/90 text-xs md:text-sm font-medium">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified children</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-trustBlue/90 shrink-0" />
              <span>Carefully selected schools</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <HeartHandshake className="w-4 h-4 text-impactGold shrink-0" />
              <span>Direct education payments</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Receipts shared</span>
            </div>
            <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Progress reports every 6 months</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
