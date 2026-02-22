"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", local: "English", english: "[English]" },
    { code: "ar", local: "العربية", english: "[Arbi]" },
    { code: "hi", local: "हिन्दी", english: "[Hindi]" },
    { code: "ur", local: "اردو", english: "[Urdu]" },
    { code: "fr", local: "Français", english: "[French]" },
    { code: "bn", local: "বাংলা", english: "[Bangla]" },
    { code: "pa", local: "ਪੰਜਾਬੀ", english: "[Punjabi]" },
    { code: "es", local: "Español", english: "[Spanish]" },
    { code: "sw", local: "Swahili", english: "[Swahili]" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(languages[0]);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const savedLang = localStorage.getItem("ODOC_LANG");
        if (savedLang) {
            const matched = languages.find(l => l.code === savedLang);
            if (matched) setCurrentLang(matched);
        }
    }, []);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    setIsVisible(false); // Scroll down
                } else {
                    setIsVisible(true);  // Scroll up
                }
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    const navLinks = [
        { href: "/programs", label: "Sponsor a Child" },
        { href: "/stories", label: "Stories" },
        { href: "/impact", label: "Our Impact" },
        { href: "/our-story", label: "Our Story" },
        { href: "/dashboard", label: "My Dashboard" },
    ];

    return (
        <nav className={cn(
            "fixed w-full z-50 transition-transform duration-300 bg-cinematic-dark/80 backdrop-blur-md border-b border-white/5",
            isVisible ? "translate-y-0" : "-translate-y-full"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-trust-blue p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Heart className="w-6 h-6 text-white fill-current" />
                        </div>
                        <span className="font-heading font-bold text-xl text-white tracking-tight notranslate">
                            OneDollarOneChild
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors text-sm font-medium",
                                    pathname.startsWith(link.href) ? "text-impact-gold" : "text-white/80 hover:text-white"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                                aria-label="Select Language"
                            >
                                <Globe className="w-5 h-5" />
                                <span className="sr-only">Language</span>
                            </button>

                            {langOpen && (
                                <div className="absolute top-10 right-0 w-48 bg-white rounded-lg shadow-xl overflow-hidden py-1 animate-fade-in-up">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                localStorage.setItem("ODOC_LANG", lang.code);
                                                window.location.reload();
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                                                currentLang.code === lang.code ? "font-bold text-trust-blue" : "text-gray-700"
                                            )}
                                        >
                                            {lang.local}
                                            {lang.english && (lang.code !== "en" || currentLang.code !== "en") && <span className="notranslate"> {lang.english}</span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">

                            <Link href="/programs">
                                <Button variant="impact" size="sm" className="font-bold">
                                    Sponsor a Child
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/programs" className="mr-2">
                            <Button variant="impact" size="sm" className="font-bold py-1 h-8 text-xs">
                                Sponsor
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-cinematic-dark border-t border-white/10 animate-fade-in">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "block py-2 font-medium transition-colors",
                                    pathname.startsWith(link.href) ? "text-impact-gold" : "text-white/80 hover:text-white"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="border-t border-white/10 pt-4">
                            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Select Language</p>
                            <div className="grid grid-cols-2 gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            localStorage.setItem("ODOC_LANG", lang.code);
                                            window.location.reload();
                                        }}
                                        className={cn(
                                            "text-left text-sm py-1 hover:text-white transition-colors",
                                            currentLang.code === lang.code ? "text-impact-gold font-bold" : "text-white/70"
                                        )}
                                    >
                                        {lang.local}
                                        {lang.english && (lang.code !== "en" || currentLang.code !== "en") && <span className="notranslate"> {lang.english}</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Link href="/programs" className="block w-full" onClick={() => setIsOpen(false)}>
                                <Button variant="impact" className="w-full">
                                    Sponsor a Child
                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
