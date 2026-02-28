import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { csrReportQueue } from "@/lib/queue/queueClient";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { sponsorId, triggerType } = body;

        if (!sponsorId) {
            return NextResponse.json({ error: "Sponsor ID required" }, { status: 400 });
        }

        const sponsor = await prisma.corporateSponsor.findUnique({
            where: { id: sponsorId },
            include: {
                user: true,
                allocations: {
                    where: { revokedAt: null },
                    include: {
                        registryChild: {
                            include: {
                                progressReports: {
                                    orderBy: { createdAt: "desc" },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!sponsor) {
            return NextResponse.json({ error: "Sponsor not found" }, { status: 404 });
        }

        // 1. Snapshot Generation (Immutable)
        // Extract snapshot metrics exactly as defined in `CSRImpactSnapshot` Schema
        const totalChildrenSponsored = (sponsor as any).allocations.length;
        const activeSponsorships = (sponsor as any).allocations.filter((a: any) => a.allocationStatus !== "OPEN").length;

        // Education Programs Supported (Mocking unique programs derived from children for simplicity)
        const uniquePrograms = new Set((sponsor as any).allocations.map((a: any) => a.registryChild.educationLevel));

        const snapshot = await prisma.cSRImpactSnapshot.create({
            data: {
                corporateSponsorId: sponsorId,
                childrenSponsored: totalChildrenSponsored,
                activeSponsorships: activeSponsorships,
                educationProgramsSupported: uniquePrograms.size,
                generatedAt: new Date()
            }
        });

        // Phase 12 Queue Refactor: Push to BullMQ rather than executing inline or awaiting
        // We still generate the immutable snapshot in the HTTP request for immediate UI tracking,
        // but offload the "Heavy PDF Generation + Dispatch" to the background.

        const jobId = `CSRGen-${sponsorId}-${snapshot.id}`;

        await csrReportQueue.add(
            `GenerateCSR-${triggerType}`,
            {
                sponsorId,
                triggerType,
                snapshotId: snapshot.id,
                totalChildrenSponsored,
            },
            {
                jobId // Review Rule: Idempotency enforcement
            }
        );

        logger.info({ jobId, sponsorId }, `[CSR_API] Successfully enqueued CSR Report generation.`);

        return NextResponse.json({ success: true, snapshotId: snapshot.id, status: "QUEUED" });

    } catch (error: any) {
        logger.error({ error: error.message }, "ESG Report Generation API Error");
        return NextResponse.json(
            { error: error.message || "Failed to generate ESG Impact Report" },
            { status: 500 }
        );
    }
}
