import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  subtext?: string;
  icon?: React.ReactNode;
  theme?: "light" | "dark" | "gold";
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  value,
  label,
  subtext,
  icon,
  theme = "light",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between",
        theme === "light" && "bg-white border-slate-100 text-cinematicDark shadow-sm",
        theme === "dark" && "bg-cinematicCharcoal border-slate-800 text-white shadow-md",
        theme === "gold" && "bg-gradient-to-br from-impactGold/10 to-amber-500/10 border-impactGold/30 text-cinematicDark",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium opacity-80 uppercase tracking-wider font-body">
          {label}
        </span>
        {icon && <div className="text-2xl text-trustBlue">{icon}</div>}
      </div>
      <div>
        <div className="text-4xl md:text-5xl font-extrabold tracking-tight font-heading mb-1">
          {value}
        </div>
        {subtext && (
          <p className="text-xs text-muted-foreground font-body leading-normal">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};
