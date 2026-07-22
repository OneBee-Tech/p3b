import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimelineStepItem {
  stepNumber: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStepItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ steps, className, ...props }) => {
  return (
    <div className={cn("relative space-y-8 before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-trustBlue before:via-trustBlue/50 before:to-transparent", className)} {...props}>
      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={step.stepNumber}
            className={cn(
              "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
          >
            {/* Step Icon Badge */}
            <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-trustBlue text-white shadow font-bold text-sm z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              {step.icon || step.stepNumber}
            </div>

            {/* Step Card Content */}
            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
              <span className="text-xs font-bold text-trustBlue uppercase tracking-wider block mb-1">
                Stage {step.stepNumber}
              </span>
              <h3 className="text-xl font-bold text-cinematicDark mb-2 font-heading">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
