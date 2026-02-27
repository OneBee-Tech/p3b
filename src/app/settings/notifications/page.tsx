import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import NotificationSettingsClient from "./NotificationSettingsClient";

export default async function NotificationSettingsPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/signin");
    }

    let preferences = await (prisma as any).emailPreferences.findUnique({
        where: { userId: session.user.id }
    });

    if (!preferences) {
        // Create defaults if not found
        preferences = await (prisma as any).emailPreferences.create({
            data: { userId: session.user.id }
        });
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Communication Preferences</h1>
            <p className="text-white/60 mb-8">Manage how NGO Impact communicates progress, critical alerts, and ESG reporting with you.</p>

            <NotificationSettingsClient initialPreferences={preferences} />
        </div>
    );
}
