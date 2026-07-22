import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
  ...props
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "space-y-3 max-w-3xl mb-10",
        align === "center" && "mx-auto text-center",
        align === "right" && "ml-auto text-right",
        align === "left" && "text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full",
            isDark
              ? "bg-impactGold/20 text-impactGold"
              : "bg-trustBlue/10 text-trustBlue"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-extrabold tracking-tight font-heading leading-tight",
          isDark ? "text-white" : "text-cinematicDark"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed font-body",
            isDark ? "text-slate-300" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
