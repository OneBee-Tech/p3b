"use client";

import { usePathname } from "next/navigation";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin")) return null;
    return (
        <footer className="bg-cinematic-dark text-white/60 pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand / Logo (Left) */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <img src="/logo.png" alt="OneDollarOneChild Logo" className="h-14 w-auto transition-opacity group-hover:opacity-80 rounded" />
                            <span className="font-heading font-bold text-lg text-white tracking-tight notranslate">
                                OneDollarOneChild
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm">
                            Supporting children through education, supplies, and opportunity. Join us in making a difference.
                        </p>
                    </div>

                    {/* Transparency Links (Middle) */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Transparency</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/impact" className="hover:text-white transition-colors">Financial Reports</Link></li>
                            <li><Link href="/impact" className="hover:text-white transition-colors">Impact Data</Link></li>
                            <li><Link href="/impact" className="hover:text-white transition-colors">Safeguarding Policy</Link></li>
                            <li><Link href="/impact" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Text Links (Right) */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Contact Us</h4>
                        <div className="space-y-4 text-sm mb-8">
                            <Link href="/contact" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Mail className="w-4 h-4" /> Contact Form
                            </Link>
                            <a href="https://wa.me/XXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                                <MessageCircle className="w-4 h-4" /> WhatsApp Support
                            </a>
                            <a href="mailto:support@onedollaronechild.org" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Mail className="w-4 h-4" /> Email Us
                            </a>
                        </div>

                        <h4 className="font-heading font-semibold text-white mb-6">Follow Our Impact</h4>
                        <div className="flex items-center gap-4">
                            <a href="https://facebook.com/onedollaronechild" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-trust-blue transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com/onedollaronechild" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#E1306C] transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com/onedollaronechild" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com/company/onedollaronechild" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#0A66C2] transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://tiktok.com/@onedollaronechild" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-[#ff0050] transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <Link href="/impact" className="hover:text-white transition-colors">Financial Reports</Link>
                        <Link href="/impact" className="hover:text-white transition-colors">Safeguarding Policy</Link>
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <p>&copy; {new Date().getFullYear()} <span className="notranslate">OneDollarOneChild</span>. All rights reserved.</p>
                        <p>Registered Non-profit Organization.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
