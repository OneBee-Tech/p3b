"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "ur", name: "اردو" },
    { code: "fr", name: "Français" },
    { code: "bn", name: "বাংলা" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "es", name: "Español" },
    { code: "sw", name: "Swahili" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(languages[0]);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-cinematic-dark/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-trust-blue p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Heart className="w-6 h-6 text-white fill-current" />
                        </div>
                        <span className="font-heading font-bold text-xl text-white tracking-tight">
                            Hope for Humanity
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="#how-it-works"
                            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="#impact"
                            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                        >
                            Our Impact
                        </Link>
                        <Link
                            href="#stories"
                            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                        >
                            Stories
                        </Link>

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
                                                setCurrentLang(lang);
                                                setLangOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                                                currentLang.code === lang.code ? "font-bold text-trust-blue" : "text-gray-700"
                                            )}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button variant="impact" size="sm" className="font-bold">
                            Donate Now
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
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
                        <Link
                            href="#how-it-works"
                            className="block text-white/80 hover:text-white py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            How It Works
                        </Link>
                        <Link
                            href="#impact"
                            className="block text-white/80 hover:text-white py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Our Impact
                        </Link>
                        <Link
                            href="#stories"
                            className="block text-white/80 hover:text-white py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Stories
                        </Link>
                        <div className="border-t border-white/10 pt-4">
                            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Select Language</p>
                            <div className="grid grid-cols-2 gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setCurrentLang(lang);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "text-left text-sm py-1 hover:text-white transition-colors",
                                            currentLang.code === lang.code ? "text-impact-gold font-bold" : "text-white/70"
                                        )}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Button variant="impact" className="w-full mt-4">
                            Donate Now
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
