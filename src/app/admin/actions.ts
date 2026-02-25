"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function logAdminAccess(pathname: string) {
    const session = await auth();

    // Verify it's actually an admin session
    if (!session?.user?.id || (session.user as any).role !== "ADMIN") {
        return;
    }

    const headerStore = await headers();
    const ip = headerStore.get("x-forwarded-for") || headerStore.get("x-real-ip") || "unknown";

    try {
        await prisma.adminAccessLog.create({
            data: {
                adminId: session.user.id,
                routeAccessed: pathname,
                ipAddress: ip,
            }
        });
    } catch (e) {
        console.error("Failed to log admin access:", e);
    }
}
