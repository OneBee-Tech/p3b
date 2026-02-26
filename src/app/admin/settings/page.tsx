import { auth } from "@/auth";
import { SettingsClient } from "./SettingsClient";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") redirect("/");

    // We can fetch initial stats here if needed, but for now just pass the admin user
    const adminUser = {
        name: session.user.name ?? "Admin User",
        email: session.user.email ?? "admin@onedollaronechild.org"
    };

    return <SettingsClient adminUser={adminUser} />;
}
