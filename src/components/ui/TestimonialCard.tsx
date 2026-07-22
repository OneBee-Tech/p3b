import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role = "Sponsor",
  avatarUrl,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6",
        className
      )}
      {...props}
    >
      <blockquote className="text-base md:text-lg font-quote text-slate-700 italic leading-relaxed">
        “{quote}”
      </blockquote>
      <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
        {avatarUrl ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
            <Image src={avatarUrl} alt={author} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-trustBlue/10 text-trustBlue font-bold flex items-center justify-center text-lg shrink-0">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-bold text-cinematicDark font-heading text-sm">
            {author}
          </div>
          {role && (
            <div className="text-xs text-muted-foreground font-body">
              {role}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
