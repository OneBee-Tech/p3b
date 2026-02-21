import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-cinematic-dark text-white/60 pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <div className="bg-white/10 p-2 rounded-lg">
                                <Heart className="w-5 h-5 text-white fill-current" />
                            </div>
                            <span className="font-heading font-bold text-lg text-white tracking-tight">
                                OneDollarOneChild
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Bringing hope to communities through education, healthcare, and sustainable development. Join us in making a difference.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Our Work</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Clean Water</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Education</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Healthcare</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Emergency Relief</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Transparency</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Financial Reports</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Impact Data</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Our Partners</Link></li>
                            <li><Link href="#" className="hover:text-impact-gold transition-colors">Privacy Policy</Link></li>
                        </ul>
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
                    <p>&copy; {new Date().getFullYear()} OneDollarOneChild. All rights reserved.</p>
                    <p>501(c)(3) Non-profit Organization.</p>
                </div>
            </div>
        </footer>
    );
}
