import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import StoriesClient from "./StoriesClient";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") return null;

    const stories = await prisma.impactStory.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <StoriesClient stories={stories} />
    );
}
