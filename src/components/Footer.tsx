"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, ShieldCheck } from "lucide-react";
import { DEFAULT_GLOBAL_SETTINGS, GlobalSettingsData } from "@/lib/services/globalSettingsService";
import { LandingNewsletterCTA } from "@/components/landing/LandingNewsletterCTA";

export interface FooterProps {
  settings?: GlobalSettingsData;
}

export function Footer({ settings = DEFAULT_GLOBAL_SETTINGS }: FooterProps) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname === "/home2") return null;

  const showNewsletter = pathname !== "/our-story" && pathname !== "/";

  return (
    <>
      {showNewsletter && <LandingNewsletterCTA />}
      <footer className="bg-[#0B0F19] text-white pt-20 pb-12 border-t border-slate-800 font-body relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight hover:text-[#fdc700] transition-colors">
                {settings.organizationName}
              </span>
            </Link>
            <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-sm">
              Small daily generosity. Real educational opportunity. Lifelong possibilities.
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-slate-300">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                Registered Office:
              </p>
              <p className="leading-relaxed text-slate-300 font-medium">{settings.registeredOffice}</p>
            </div>
            <div className="pt-3 flex items-center gap-3 text-white">
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-white hover:bg-[#fdc700] hover:text-[#0B0F19] transition-all shadow"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-white hover:bg-[#fdc700] hover:text-[#0B0F19] transition-all shadow"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-white hover:bg-[#fdc700] hover:text-[#0B0F19] transition-all shadow"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${settings.contactEmails.info}`}
                aria-label="Email Support"
                className="p-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-white hover:bg-[#fdc700] hover:text-[#0B0F19] transition-all shadow"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-heading font-extrabold text-white mb-4 text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/our-story" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Our Story</Link></li>
              <li><Link href="/how-it-works" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">How It Works</Link></li>
              <li><Link href="/sponsor" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Sponsor a Child</Link></li>
              <li><Link href="/impact" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Our Impact</Link></li>
              <li><Link href="/transparency" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Transparency</Link></li>
            </ul>
          </div>

          {/* Get Involved Column */}
          <div>
            <h4 className="font-heading font-extrabold text-white mb-4 text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Get Involved
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/checkout" className="text-[#fdc700] hover:text-white font-extrabold transition-colors">Give $1 a Day</Link></li>
              <li><Link href="/partnership" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Corporate Partnerships</Link></li>
              <li><Link href="/assist" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Volunteer</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Start a Fundraiser</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Youth Ambassadors</Link></li>
            </ul>
          </div>

          {/* Policies & Support Column */}
          <div>
            <h4 className="font-heading font-extrabold text-white mb-4 text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Policies & Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">FAQs</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Contact Us</Link></li>
              <li><Link href="/transparency" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/transparency" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Safeguarding Policy</Link></li>
              <li><Link href="/transparency" className="text-slate-300 hover:text-[#fdc700] transition-colors font-medium">Donation Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal & CRA Disclaimer Line */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Registered in Canada | {settings.organizationName}</span>
          </div>
          <p className="text-center md:text-right text-slate-300 font-medium">
            &copy; {new Date().getFullYear()} {settings.organizationName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
