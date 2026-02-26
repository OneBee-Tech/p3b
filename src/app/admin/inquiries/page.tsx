import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { InquiriesClient } from "./InquiriesClient";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") redirect("/");

    // Raw SQL query — bypasses generated client, works even if prisma generate hasn't updated yet
    const inquiries = await prisma.$queryRaw<any[]>`
        SELECT id, name, email, "inquiryType", message, status, "createdAt"
        FROM "ContactInquiry"
        WHERE "deletedAt" IS NULL
          AND "isArchived" = false
        ORDER BY "createdAt" DESC
    `;

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
