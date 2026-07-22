import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ContentBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  body: string | React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaHref?: string;
  theme?: "light" | "warm" | "dark";
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  body,
  imageUrl,
  imageAlt = "Content illustration",
  imagePosition = "right",
  ctaText,
  ctaHref,
  theme = "light",
  className,
  ...props
}) => {
  const isRight = imagePosition === "right";

  return (
    <div
      className={cn(
        "py-12 px-6 md:px-12 rounded-3xl border transition-all my-8",
        theme === "light" && "bg-white border-slate-100 text-cinematicDark",
        theme === "warm" && "bg-surface-warmBg border-amber-100 text-cinematicDark",
        theme === "dark" && "bg-cinematicDark border-slate-800 text-white",
        className
      )}
      {...props}
    >
      <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 items-center")}>
        {/* Text Section */}
        <div
          className={cn(
            "lg:col-span-7 space-y-4",
            isRight ? "lg:order-1" : "lg:order-2"
          )}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight leading-tight">
            {title}
          </h2>
          <div className="text-base text-muted-foreground leading-relaxed font-body space-y-3">
            {typeof body === "string" ? <p>{body}</p> : body}
          </div>
          {ctaText && ctaHref && (
            <div className="pt-2">
              <Button asChild className="bg-trustBlue hover:bg-trustBlue/90 text-white font-semibold">
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Image Section */}
        {imageUrl && (
          <div
            className={cn(
              "lg:col-span-5 relative min-h-[280px] rounded-2xl overflow-hidden shadow-md border border-slate-200/50",
              isRight ? "lg:order-2" : "lg:order-1"
            )}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        )}
      </div>
    </div>
  );
};
