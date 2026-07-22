"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FinalCTAProps extends React.HTMLAttributes<HTMLElement> {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  disclaimerText?: string;
  theme?: "dark" | "gold" | "trust";
  analyticsEventName?: string;
}

export function FinalCTA({
  badgeText = "Join the movement today",
  title = "You May Forget Where You Spent One Dollar Today. A Child May Remember Its Impact for the Rest of Their Life.",
  subtitle = "Give one dollar a day. Help a child enter a classroom, receive the materials they need and continue building their future.",
  primaryCta = { text: "Start Giving $1 a Day", href: "/checkout" },
  secondaryCta = { text: "Invite Someone to Join", href: "/contact" },
  disclaimerText = "Registered in Canada • Receipts shared • Direct education payments",
  theme = "dark",
  analyticsEventName = "cta_section_clicked",
  className,
  ...props
}: FinalCTAProps) {
  const handleCtaClick = (ctaType: "primary" | "secondary") => {
    if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag("event", analyticsEventName, {
        cta_type: ctaType,
      });
    }
  };

  return (
    <section
      className={cn(
        "relative py-24 md:py-32 flex items-center justify-center text-center overflow-hidden my-12 rounded-3xl",
        theme === "dark" && "bg-cinematicDark text-white",
        theme === "gold" && "bg-gradient-to-br from-amber-500 to-impactGold text-cinematicDark",
        theme === "trust" && "bg-gradient-to-br from-trustBlue to-blue-900 text-white",
        className
      )}
      {...props}
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        {badgeText && (
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
            <Heart className="w-4 h-4 text-impactGold fill-current" />
            <span>{badgeText}</span>
          </div>
        )}

        <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight max-w-3xl mx-auto leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryCta && (
            <Button
              asChild
              size="lg"
              onClick={() => handleCtaClick("primary")}
              className="text-base font-bold px-8 py-6 rounded-full bg-impactGold text-cinematicDark hover:bg-impactGold/90 shadow-xl"
            >
              <Link href={primaryCta.href}>{primaryCta.text}</Link>
            </Button>
          )}

          {secondaryCta && (
            <Button
              asChild
              variant="outline"
              size="lg"
              onClick={() => handleCtaClick("secondary")}
              className="text-base font-semibold px-8 py-6 rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Link href={secondaryCta.href}>
                {secondaryCta.text} <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          )}
        </div>

        {disclaimerText && (
          <p className="text-xs opacity-60 mt-8 font-body">
            {disclaimerText}
          </p>
        )}
      </div>
    </section>
  );
}
