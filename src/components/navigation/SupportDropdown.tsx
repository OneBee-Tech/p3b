"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Mail, HelpCircle, LifeBuoy, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SupportDropdownProps {
  isScrolled?: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export function SupportDropdown({
  isScrolled = false,
  isOpen,
  onOpen,
  onClose,
  onToggle,
}: SupportDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const menuItems = [
    {
      label: "Contact Us",
      href: "/contact",
      icon: <Mail className="w-4 h-4 text-trustBlue" />,
      description: "Send a direct message to our support teams.",
    },
    {
      label: "FAQs",
      href: "/faq",
      icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
      description: "Find instant answers to common sponsorship questions.",
    },
    {
      label: "Request Assistance",
      href: "/contact?type=request-assistance",
      icon: <LifeBuoy className="w-4 h-4 text-emerald-600" />,
      description: "Submit an inquiry for child education assistance.",
    },
    {
      label: "Media & Press",
      href: "/contact?type=media",
      icon: <Newspaper className="w-4 h-4 text-purple-600" />,
      description: "Press inquiries and media resources.",
    },
  ];

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        onClick={onToggle}
        onMouseEnter={onOpen}
        className={cn(
          "flex items-center gap-1 text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-trustBlue py-1 whitespace-nowrap",
          isScrolled
            ? "text-slate-700 hover:text-trustBlue"
            : "text-white/90 hover:text-white"
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>Support</span>
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top z-50",
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
        )}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <div className="p-2.5 bg-white space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
              onClick={onClose}
            >
              <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-white shrink-0 shadow-sm border border-slate-100">
                {item.icon}
              </div>
              <div>
                <span className="block font-bold text-cinematicDark group-hover:text-trustBlue transition-colors text-xs font-heading">
                  {item.label}
                </span>
                <span className="block text-[11px] text-muted-foreground leading-tight mt-0.5 font-body">
                  {item.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
