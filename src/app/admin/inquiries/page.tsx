import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { InquiriesClient } from "./InquiriesClient";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") redirect("/");

    const inquiries = await prisma.contactInquiry.findMany({
        where: {
            deletedAt: null,
            isArchived: false,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-heading font-bold text-white mb-1">Contact Inquiries</h1>
                <p className="text-white/50 text-sm">All inbound contact form submissions. Default view excludes archived and deleted entries.</p>
            </div>
            <InquiriesClient inquiries={inquiries} />
        </div>
    );
}
