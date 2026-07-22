import * as React from "react";
import { cn } from "@/lib/utils";

export const HeroSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full py-20 px-6 max-w-5xl mx-auto space-y-6 animate-pulse", className)} aria-busy="true">
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-1/4 mx-auto" />
    <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-3/4 mx-auto" />
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/2 mx-auto" />
    <div className="flex justify-center gap-4 pt-4">
      <div className="h-12 w-40 bg-slate-200 dark:bg-slate-800 rounded-full" />
      <div className="h-12 w-40 bg-slate-200 dark:bg-slate-800 rounded-full" />
    </div>
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("p-6 rounded-2xl border border-slate-100 bg-white space-y-4 animate-pulse", className)} aria-busy="true">
    <div className="h-4 bg-slate-200 rounded w-1/3" />
    <div className="h-8 bg-slate-200 rounded w-2/3" />
    <div className="h-16 bg-slate-200 rounded w-full" />
  </div>
);

export const FAQSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("space-y-4 max-w-3xl mx-auto animate-pulse", className)} aria-busy="true">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-14 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
    ))}
  </div>
);

export const StatsSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse", className)} aria-busy="true">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
    ))}
  </div>
);
