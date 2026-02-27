import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dispatchEmailEvent } from "@/lib/email/emailEventBus";

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

        // 2. We mock out the actual @react-pdf/renderer execution here due to heavy rendering requirements.
        // In full production, this would queue a worker to generate the PDF and upload it to Object Storage (S3).
        const mockPdfUrl = `https://storage.ngo.org/csr-reports/${sponsor.id}/${snapshot.id}.pdf`;

        // We return the external Mock PDF URL to the caller instead of saving it on the Snapshot (since schema was simplified).

        // Phase 10 Integration: Dispatch email event to the Corporate Portal User
        if (sponsor.userId) {
            await dispatchEmailEvent({
                eventType: "CSR_SNAPSHOT_READY",
                recipientId: sponsor.userId,
                recipientType: "CORPORATE",
                entityId: snapshot.id,
                data: {
                    childrenCount: totalChildrenSponsored,
                    reportUrl: mockPdfUrl
                }
            });
        }

        return NextResponse.json({ success: true, snapshotId: snapshot.id, reportUrl: mockPdfUrl });

    } catch (error: any) {
        console.error("ESG Report Generation Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate ESG Impact Report" },
            { status: 500 }
        );
    }
}
