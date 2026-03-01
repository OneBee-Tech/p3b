import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { AdminAccessTracker } from "./AdminAccessTracker";
import { AdminSidebarNav } from "./AdminSidebarNav";
import prisma from "@/lib/prisma";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    // Fetch unread/new counts for notification badges
    const [newInquiries, newReferrals, newChildren] = await Promise.all([
        prisma.contactInquiry.count({ where: { status: "NEW", isArchived: false } }),
        prisma.referral.count({ where: { status: "PENDING", isArchived: false } }),
        prisma.registryChild.count({ where: { deletedAt: null, isArchived: false, safeguardingReviewStatus: "PENDING" } }),
    ]);

    const badges = {
        inquiries: newInquiries,
        referrals: newReferrals,
        children: newChildren,
    };

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

                <AdminSidebarNav
                    badges={badges}
                    adminName={session.user.name || "Admin"}
                />
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
