"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { GetInvolvedDropdown } from "@/components/navigation/GetInvolvedDropdown";
import { SupportDropdown } from "@/components/navigation/SupportDropdown";

const languages = [
  { code: "en", local: "English" },
  { code: "fr", local: "Français" },
  { code: "es", local: "Español" },
  { code: "ar", local: "العربية" },
  { code: "hi", local: "हिन्दी" },
];

export function Navbar({ session }: { session?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<"get-involved" | "support" | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem("ODOC_LANG");
    if (savedLang) {
      const matched = languages.find((l) => l.code === savedLang);
      if (matched) setCurrentLang(matched);
    }
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        setIsScrolled(currentScrollY > 40);

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false); // Hide on scroll down
        } else {
          setIsVisible(true); // Show on scroll up
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const primaryNavLinks = [
    { href: "/", label: "Home" },
    { href: "/our-story", label: "Our Story" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/sponsor", label: "Sponsor a Child" },
    { href: "/impact", label: "Our Impact" },
  ];

  if (pathname?.startsWith("/admin") || pathname === "/home2") return null;

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 transform",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2"
          : "bg-cinematicDark/90 backdrop-blur-md border-b border-white/10 py-3"
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 items-center h-14 md:h-16 gap-x-2">
          {/* 1. Left Column: Brand Title Pinned to Far Left (4 cols) */}
          <div className="col-span-8 lg:col-span-4 flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              {/* Mobile Logo Placeholder (visible on mobile, hidden on tablet/desktop) */}
              <div className="md:hidden flex items-center justify-center w-8 h-8 rounded bg-[#fdc700] text-white font-extrabold text-xs shadow-sm shrink-0">
                O1
              </div>
              
              {/* Brand Text (hidden on mobile, visible on tablet/desktop) */}
              <span
                className={cn(
                  "hidden md:block font-heading font-extrabold text-sm md:text-base lg:text-lg tracking-tight transition-colors whitespace-nowrap",
                  isScrolled ? "text-cinematicDark" : "text-white"
                )}
              >
                One Dollar. One Child. One Future.
              </span>
            </Link>
          </div>

          {/* 2. Center Column: Centered Navigation Links (5 cols) */}
          <div className="hidden lg:flex col-span-5 items-center justify-center gap-4 xl:gap-6 flex-nowrap">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors text-[11px] xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0",
                  pathname === link.href
                    ? isScrolled
                      ? "text-trustBlue font-extrabold"
                      : "text-[#fdc700] font-extrabold"
                    : isScrolled
                    ? "text-slate-700 hover:text-trustBlue"
                    : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Single-Active Dropdowns: Get Involved */}
            <GetInvolvedDropdown
              isScrolled={isScrolled}
              isOpen={activeDropdown === "get-involved"}
              onOpen={() => setActiveDropdown("get-involved")}
              onClose={() => setActiveDropdown(null)}
              onToggle={() =>
                setActiveDropdown((prev) => (prev === "get-involved" ? null : "get-involved"))
              }
            />

            {/* Single-Active Dropdowns: Support */}
            <SupportDropdown
              isScrolled={isScrolled}
              isOpen={activeDropdown === "support"}
              onOpen={() => setActiveDropdown("support")}
              onClose={() => setActiveDropdown(null)}
              onToggle={() =>
                setActiveDropdown((prev) => (prev === "support" ? null : "support"))
              }
            />

            {/* Language Switcher */}
            <div className="relative shrink-0">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  "flex items-center gap-1 transition-colors p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-trustBlue",
                  isScrolled ? "text-slate-700 hover:text-trustBlue" : "text-white/90 hover:text-white"
                )}
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4" />
              </button>

              {langOpen && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-36 bg-white rounded-xl shadow-xl overflow-hidden py-1 z-50 border border-slate-100">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        localStorage.setItem("ODOC_LANG", lang.code);
                        window.location.reload();
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors",
                        currentLang.code === lang.code ? "font-bold text-trustBlue" : "text-slate-700"
                      )}
                    >
                      {lang.local}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Right Column: Action Buttons Pinned to Far Right (3 cols) */}
          <div className="hidden lg:flex col-span-3 items-center justify-end gap-3 shrink-0">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-trustBlue flex items-center justify-center text-xs font-bold text-white uppercase shadow ring-2 ring-white/20">
                    {session.user?.name ? session.user.name.charAt(0) : "U"}
                  </div>
                </button>
                {profileOpen && (
                  <div className="absolute top-10 right-0 w-44 bg-white rounded-xl shadow-xl overflow-hidden py-2 border border-slate-100 z-50">
                    <Link
                      onClick={() => setProfileOpen(false)}
                      href="/dashboard"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      My Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Standalone Sign In Button: text always white, on hover color becomes #fdc700 */
              <Button
                asChild
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs font-bold rounded-full px-4 py-2 transition-all border shadow-sm text-white bg-cinematicDark/80 hover:bg-cinematicDark hover:text-[#fdc700] border-white/20 hover:border-[#fdc700] whitespace-nowrap",
                  isScrolled && "bg-slate-900 text-white hover:bg-slate-800 hover:text-[#fdc700] hover:border-[#fdc700]"
                )}
              >
                <Link href="/signin">
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  Sign In
                </Link>
              </Button>
            )}

            {/* Standalone Give $1 a Day Button with #fdc700 background and white text */}
            <Button
              asChild
              size="sm"
              className="bg-[#fdc700] text-white hover:bg-[#fdc700]/90 font-extrabold rounded-full px-5 py-2 text-xs shadow-md transition-all shrink-0 whitespace-nowrap"
            >
              <Link href="/checkout">Give $1 a Day</Link>
            </Button>
          </div>

          {/* Mobile Controls (Col 4) */}
          <div className="lg:hidden col-span-4 flex items-center justify-end gap-2 shrink-0">
            <Button
              asChild
              size="sm"
              className="bg-[#fdc700] text-white font-extrabold text-xs rounded-full px-3 py-1 h-8 whitespace-nowrap"
            >
              <Link href="/checkout">Give $1 a Day</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={isScrolled ? "text-slate-800" : "text-white"}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-cinematicDark text-white border-t border-white/10 py-6 px-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-[#fdc700] uppercase tracking-widest mb-1">Navigation</p>
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block py-2 text-sm font-semibold transition-colors",
                  pathname === link.href ? "text-[#fdc700] font-bold" : "text-slate-200 hover:text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <p className="text-[10px] font-bold text-[#fdc700] uppercase tracking-widest mb-1">Get Involved</p>
            <Link href="/refer" className="block py-1.5 text-xs text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Refer a Child</Link>
            <Link href="/assist" className="block py-1.5 text-xs text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Request Assistance</Link>
            <Link href="/assist" className="block py-1.5 text-xs text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Volunteer</Link>
            <Link href="/contact" className="block py-1.5 text-xs text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Start a Fundraiser</Link>
            <Link href="/contact" className="block py-1.5 text-xs text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Youth Ambassador</Link>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <p className="text-[10px] font-bold text-[#fdc700] uppercase tracking-widest mb-1">Support & Contact</p>
            <Link href="/contact" className="block py-1.5 text-xs text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Contact Us</Link>
            <Link href="/faq" className="block py-1.5 text-xs text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>FAQs</Link>
            <Link href="/partnership" className="block py-1.5 text-xs text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>Corporate Partnerships</Link>
          </div>

          <div className="border-t border-white/10 pt-4">
            <Link
              href="/signin"
              className="block py-2 text-xs font-bold text-white hover:text-[#fdc700] uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
