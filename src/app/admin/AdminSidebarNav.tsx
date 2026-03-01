"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, HeartHandshake, FileText,
    BarChart3, ShieldCheck, Settings, Mail, LogOut, Activity, Globe,
} from "lucide-react";

interface NavBadges {
    inquiries: number;
    referrals: number;
    children: number;
}

const navItems = [
    { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Children Registry", href: "/admin/children", icon: Users, badgeKey: "children" as keyof NavBadges },
    { name: "Donations Monitor", href: "/admin/donations", icon: HeartHandshake },
    { name: "Referrals Intake", href: "/admin/referrals", icon: FileText, badgeKey: "referrals" as keyof NavBadges },
    { name: "Inquiries", href: "/admin/inquiries", icon: Mail, badgeKey: "inquiries" as keyof NavBadges },
    { name: "Impact Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Progress Reports", href: "/admin/progress", icon: FileText },
    { name: "Milestones", href: "/admin/milestones", icon: BarChart3 },
    { name: "Compliance Docs", href: "/admin/compliance", icon: ShieldCheck },
    { name: "Sponsorship Health", href: "/admin/sponsorship-health", icon: Activity },
    { name: "Impact Intelligence", href: "/admin/impact-intelligence", icon: Activity },
    { name: "Corporate Sponsors", href: "/admin/corporate", icon: ShieldCheck },
    { name: "Institutional CSR", href: "/admin/corporate-impact", icon: Activity },
    { name: "Impact Stories CMS", href: "/admin/stories", icon: Globe },
    { name: "Newsletter Broadcast", href: "/admin/newsletter", icon: Mail },
    { name: "Email Outbox Logs", href: "/admin/email-logs", icon: Mail },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebarNav({ badges, adminName }: { badges: NavBadges; adminName: string }) {
    const pathname = usePathname();

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href, item.exact);
                    const badgeCount = item.badgeKey ? badges[item.badgeKey] : 0;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all border relative
                                ${active
                                    ? "bg-trust-blue text-white border-trust-blue shadow-lg shadow-trust-blue/20"
                                    : "text-white/70 border-transparent hover:text-white hover:bg-trust-blue/20 hover:border-trust-blue/30"
                                }`}
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            <span className="flex-1 truncate">{item.name}</span>
                            {badgeCount > 0 && (
                                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                                    {badgeCount > 99 ? "99+" : badgeCount}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-trust-blue/30 text-trust-blue flex items-center justify-center font-bold">
                        {adminName?.charAt(0) || "A"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-white truncate">{adminName}</p>
                        <p className="text-xs text-white/50 truncate">Administrator</p>
                    </div>
                </div>
                <Link
                    href="/"
                    className="mt-2 flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Exit Admin
                </Link>
            </div>
        </>
    );
}
