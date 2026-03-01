"use client";

import { useEffect, useState } from "react";
import { Facebook, Twitter, Linkedin, LucideIcon, Share2 } from "lucide-react";

export function SocialShare({ title }: { title: string }) {
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);

    useEffect(() => {
        // Enforce Canonical Domain Rule - Do not rely on window.location directly for the hostname
        // Fallback to window.location.pathname if NEXT_PUBLIC_SITE_URL is missing, but enforce the base
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onedollaronechild.org';
        const canonicalUrl = `${baseUrl}${window.location.pathname}`;
        setCurrentUrl(canonicalUrl);
    }, []);

    if (!currentUrl) return null; // Hydration preservation

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            bgColor: "bg-[#1877F2]",
        },
        {
            name: "X (Twitter)",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            bgColor: "bg-black",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            bgColor: "bg-[#0A66C2]",
        },
    ];

    return (
        <div className="flex flex-col items-center sm:items-start gap-4 py-8 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share this Impact
            </h4>
            <div className="flex flex-wrap items-center gap-3">
                {shareLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Share on ${link.name}`}
                            className={`flex justify-center items-center w-10 h-10 rounded-full text-white ${link.bgColor} hover:scale-110 hover:shadow-lg transition-transform duration-200`}
                        >
                            <Icon className="w-4 h-4" fill="currentColor" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
