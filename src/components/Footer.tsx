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
                        <div className="space-y-4 text-sm">
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
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} <span className="notranslate">OneDollarOneChild</span>. All rights reserved.</p>
                    <p>Registered Non-profit Organization.</p>
                </div>
            </div>
        </footer>
    );
}
