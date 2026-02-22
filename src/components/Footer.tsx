import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-cinematic-dark text-white/60 pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <img src="/logo.png" alt="OneDollarOneChild Logo" className="h-14 w-auto transition-opacity group-hover:opacity-80 rounded" />
                            <span className="font-heading font-bold text-lg text-white tracking-tight notranslate">
                                OneDollarOneChild
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Supporting children through education, supplies, and opportunity. Join us in making a difference.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Transparency Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Transparency</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Financial Reports</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Impact Data</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Safeguarding Policy</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Contact & Referrals</h4>
                        <p className="text-xs mb-4 text-white/80">Know a child who needs support? Contact us via WhatsApp or email.</p>

                        <div className="space-y-3 mb-6">
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-impact-gold transition-colors">
                                <MessageCircle className="w-4 h-4" /> WhatsApp Support
                            </a>
                            <a href="mailto:support@onedollaronechild.org" className="flex items-center gap-2 text-sm hover:text-impact-gold transition-colors">
                                <Mail className="w-4 h-4" /> Email Us
                            </a>
                        </div>

                        <ul className="space-y-2 text-xs">
                            <li><a href="mailto:support@onedollaronechild.org?subject=Child%20Referral" className="hover:text-impact-gold transition-colors block border border-white/20 rounded px-2 py-1.5 text-center">Refer a Child</a></li>
                            <li><a href="mailto:support@onedollaronechild.org?subject=Request%20Assistance" className="hover:text-impact-gold transition-colors block border border-white/20 rounded px-2 py-1.5 text-center">Request Assistance</a></li>
                            <li><a href="mailto:partnerships@onedollaronechild.org?subject=Partnership%20Inquiry" className="hover:text-impact-gold transition-colors block border border-white/20 rounded px-2 py-1.5 text-center">Partnership Inquiry</a></li>
                        </ul>
                        <p className="text-[10px] mt-4 text-white/40 italic">All inbound child referrals must pass NGO eligibility verification before sponsorship onboarding.</p>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Stay Connected</h4>
                        <p className="text-sm mb-4">Receive updates on the lives you're changing.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm w-full focus:outline-none focus:border-impact-gold transition-colors"
                            />
                            <button className="bg-white text-cinematic-dark px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                                <Mail className="w-5 h-5" />
                            </button>
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
