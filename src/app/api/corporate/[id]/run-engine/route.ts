import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { allocateChildrenToCorporateSponsor } from "@/lib/corporateAllocationEngine";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const result = await allocateChildrenToCorporateSponsor(params.id, session.user);

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            allocatedCount: result.allocatedCount
        });

    } catch (error: any) {
        console.error("Engine execution error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to execute allocation engine" },
            { status: 500 }
        );
    }
}
