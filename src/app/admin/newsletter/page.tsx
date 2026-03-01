import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";
import { NewsletterDispatchForm } from "./NewsletterDispatchForm";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Newsletter Dispatch — Admin",
};

export default async function AdminNewsletterPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    const subscriberCount = await prisma.newsletterSubscriber.count({
        where: { isActive: true },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3 mb-2">
                    <Mail className="w-8 h-8 text-trust-blue" />
                    Newsletter Broadcast
                </h1>
                <p className="text-white/60">Draft and dispatch impact updates to your mailing list directly from this console.</p>
            </div>

            <NewsletterDispatchForm subscriberCount={subscriberCount} />
        </div>
    );
}
