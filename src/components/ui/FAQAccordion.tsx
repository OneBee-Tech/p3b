"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FaqItem } from "@/lib/services/contentService";

export interface FAQAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[];
  enableSchemaJsonLd?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  enableSchemaJsonLd = true,
  className,
  ...props
}) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const schemaJsonLd = React.useMemo(() => {
    if (!enableSchemaJsonLd || items.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }, [items, enableSchemaJsonLd]);

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No FAQs currently available.
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl mx-auto space-y-4", className)} {...props}>
      {/* Schema.org FAQ JSON-LD script for SEO */}
      {schemaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}

      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id || index}
            className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-cinematicCharcoal transition-all shadow-sm"
          >
            <button
              type="button"
              className="w-full px-6 py-5 text-left font-semibold text-lg flex items-center justify-between font-heading text-cinematicDark dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trustBlue"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className="ml-4 text-trustBlue text-xl font-bold transition-transform duration-300">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-base text-muted-foreground font-body leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
