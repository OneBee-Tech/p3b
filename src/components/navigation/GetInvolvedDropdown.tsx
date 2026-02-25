"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, HeartHandshake, LifeBuoy, Building2 } from "lucide-react";

export function GetInvolvedDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        {
            label: "Refer a Child",
            href: "/refer",
            icon: <HeartHandshake className="w-4 h-4 text-trust-blue" />,
            description: "Submit a case for a child in need of sponsorship."
        },
        {
            label: "Request Assistance",
            href: "/assist",
            icon: <LifeBuoy className="w-4 h-4 text-impact-gold" />,
            description: "Reach out for community or family support."
        },
        {
            label: "Partnership Inquiry",
            href: "/partnership",
            icon: <Building2 className="w-4 h-4 text-emerald-500" />,
            description: "Collaborate with our NGO as an institutional partner."
        }
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                Get Involved
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top
          ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {/* Arrow pointer */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100" />

                <div className="relative bg-white p-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="flex items-center gap-2 font-bold text-cinematic-dark group-hover:text-trust-blue transition-colors text-sm">
                                {item.icon}
                                {item.label}
                            </span>
                            <span className="text-xs text-gray-500 mt-1 pl-6">
                                {item.description}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
