import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { revokeCorporateAllocation } from "@/lib/corporateAllocationEngine";

export async function POST(
    req: Request,
    { params }: { params: { id: string; allocationId: string } }
) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { reason } = body;

        if (!reason || reason.trim() === "") {
            return NextResponse.json({ error: "Revocation reason is required for governance tracking." }, { status: 400 });
        }

        const result = await revokeCorporateAllocation(params.allocationId, reason, session.user);

        if (!result.success) {
            return NextResponse.json({ error: "Failed to revoke allocation." }, { status: 400 });
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Revocation execution error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to execute allocation revocation" },
            { status: 500 }
        );
    }
}
