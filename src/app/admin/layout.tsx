import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { LayoutDashboard, Users, HeartHandshake, FileText, BarChart3, ShieldCheck, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { AdminAccessTracker } from "./AdminAccessTracker";

const navItems = [
    { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Children Registry", href: "/admin/children", icon: Users },
    { name: "Donations Monitor", href: "/admin/donations", icon: HeartHandshake },
    { name: "Referrals Intake", href: "/admin/referrals", icon: FileText },
    { name: "Impact Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Compliance Docs", href: "/admin/compliance", icon: ShieldCheck },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // 1. Role-Based Access Control
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-cinematic-dark text-white flex">
            <AdminAccessTracker />
            {/* Left Sidebar */}
            <aside className="w-64 bg-cinematic-dark border-r border-white/10 flex flex-col hidden md:flex sticky top-0 h-screen">
                <div className="p-6">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full border border-impact-gold flex items-center justify-center p-1 bg-white">
                            <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
                        </div>
                        <span className="font-heading font-bold text-lg tracking-wide text-white group-hover:text-impact-gold transition-colors">
                            NGO Admin
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 rounded-xl hover:text-white hover:bg-trust-blue/20 transition-all border border-transparent hover:border-trust-blue/30"
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-trust-blue/30 text-trust-blue flex items-center justify-center font-bold">
                            {session.user.name?.charAt(0) || "A"}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="font-bold text-white truncate">{session.user.name}</p>
                            <p className="text-xs text-white/50 truncate">Administrator</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="mt-2 flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                        <LogOut className="w-4 h-4" /> Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 overflow-y-auto bg-[#0a0f16]">
                <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
