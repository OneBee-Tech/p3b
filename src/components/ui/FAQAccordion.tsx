"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FaqItem } from "@/lib/services/contentService";
import { ChevronDown } from "lucide-react";

export interface FAQAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[];
  enableSchemaJsonLd?: boolean;
}

// Inline Clean Vector SVGs for Category Icons
const CATEGORY_SVGS: Record<string, React.ReactNode> = {
  "Getting Started": (
    <svg className="w-4 h-4 text-trust-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "Sponsorship": (
    <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  "Reports & Transparency": (
    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "Child Safety": (
    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457-.312-2.841-.873-4.088" />
    </svg>
  ),
  "Schools & Programs": (
    <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4" />
    </svg>
  ),
  "Corporate Sponsorship": (
    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4" />
    </svg>
  ),
  "Legal & Tax": (
    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m0 0l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 6l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0" />
    </svg>
  ),
};

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  enableSchemaJsonLd = true,
  className,
  ...props
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id || null);

  // Extract unique categories
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ["All", ...Array.from(set)];
  }, [items]);

  // Filter items by category
  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      return selectedCategory === "All" || item.category === selectedCategory;
    });
  }, [items, selectedCategory]);

  // Group filtered items by category if "All" is selected
  const groupedItems = React.useMemo(() => {
    if (selectedCategory !== "All") {
      return { [selectedCategory]: filteredItems };
    }
    const map: Record<string, FaqItem[]> = {};
    filteredItems.forEach((item) => {
      const cat = item.category || "Getting Started";
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    });
    return map;
  }, [filteredItems, selectedCategory]);

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

  return (
    <div className={cn("max-w-4xl mx-auto space-y-8", className)} {...props}>
      {/* Schema.org FAQ JSON-LD script for SEO */}
      {schemaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}

      {/* 1. Topic Category Filter Pills with Clean SVGs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const SvgIcon = CATEGORY_SVGS[cat];
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
              }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs",
                isSelected
                  ? "bg-cinematic-dark text-white shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80"
              )}
            >
              {SvgIcon}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Grouped FAQ Accordions */}
      <div className="space-y-10">
        {Object.entries(groupedItems).map(([categoryName, categoryFaqs]) => {
          const CatSvg = CATEGORY_SVGS[categoryName] || CATEGORY_SVGS["Getting Started"];
          return (
            <div key={categoryName} className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-200">
                <div className="w-7 h-7 rounded-lg bg-blue-50/80 flex items-center justify-center shrink-0">
                  {CatSvg}
                </div>
                <h3 className="font-heading font-extrabold text-lg text-cinematic-dark uppercase tracking-wider">
                  {categoryName}
                </h3>
                <span className="text-xs text-gray-400 font-medium">({categoryFaqs.length})</span>
              </div>

              <div className="space-y-3">
                {categoryFaqs.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "border rounded-2xl overflow-hidden transition-all duration-200 bg-white",
                        isOpen
                          ? "border-trust-blue/40 shadow-md ring-1 ring-trust-blue/10"
                          : "border-gray-200/80 hover:border-gray-300 shadow-xs"
                      )}
                    >
                      <button
                        type="button"
                        className="w-full px-6 py-4 text-left font-bold text-base flex items-center justify-between font-heading text-cinematic-dark focus:outline-none"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4">{item.question}</span>
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                            isOpen ? "bg-trust-blue text-white rotate-180" : "bg-gray-100 text-gray-500"
                          )}
                        >
                          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-sm sm:text-base text-gray-600 font-body leading-relaxed border-t border-gray-100 pt-4 bg-slate-50/50 animate-fade-in">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
