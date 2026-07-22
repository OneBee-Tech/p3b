import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface DonationOption {
  type: "monthly" | "annually" | "complete" | "custom";
  title: string;
  price: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  badgeText?: string;
  isPopular?: boolean;
}

export interface DonationOptionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  option: DonationOption;
  checkoutHref?: string;
}

export const DonationOptionCard: React.FC<DonationOptionCardProps> = ({
  option,
  checkoutHref = "/checkout",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between hover:shadow-xl bg-white",
        option.isPopular
          ? "border-2 border-trustBlue shadow-lg ring-1 ring-trustBlue/20"
          : "border-slate-200 shadow-sm",
        className
      )}
      {...props}
    >
      {option.isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-trustBlue text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow">
          Most Popular
        </span>
      )}

      <div>
        {option.badgeText && (
          <span className="inline-block text-xs font-semibold text-trustBlue bg-trustBlue/10 px-3 py-1 rounded-full mb-3">
            {option.badgeText}
          </span>
        )}
        <h3 className="text-xl font-bold font-heading text-cinematicDark mb-1">
          {option.title}
        </h3>
        <div className="flex items-baseline gap-1 my-3">
          <span className="text-3xl md:text-4xl font-extrabold font-heading text-trustBlue">
            {option.price}
          </span>
          {option.subtitle && (
            <span className="text-sm font-medium text-muted-foreground">
              {option.subtitle}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
          {option.description}
        </p>
      </div>

      <Button
        asChild
        className={cn(
          "w-full py-6 font-bold text-base rounded-full shadow-md transition-all",
          option.isPopular
            ? "bg-trustBlue hover:bg-trustBlue/90 text-white"
            : "bg-cinematicDark hover:bg-cinematicDark/90 text-white"
        )}
      >
        <Link href={`${checkoutHref}?option=${option.type}`}>
          {option.buttonText}
        </Link>
      </Button>
    </div>
  );
};
