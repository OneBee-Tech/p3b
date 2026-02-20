import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { renderToStream } from '@react-pdf/renderer';
import { ImpactCertificate } from "@/lib/pdf/ImpactCertificate";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch donor metrics for the certificate
        const donor = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                donations: { where: { status: 'SUCCEEDED' } },
                sponsorships: true
            }
        });

        if (!donor) {
            return new NextResponse("Donor records not found", { status: 404 });
        }

        // Calculate Lifetime Impact
        const totalDonatedUSD = donor.donations.reduce((sum, d) => sum + Number(d.baseAmountUSD || d.amount), 0);
        const programIds = new Set([
            ...donor.donations.map(d => d.programId),
            ...donor.sponsorships.map(s => s.programId)
        ].filter(Boolean));
        const communitiesSupported = programIds.size;

        if (totalDonatedUSD === 0) {
            return new NextResponse("No verified impact records available to generate certificate.", { status: 400 });
        }

        // [OBSERVABILITY] Log Certificate Generation
        console.log(`[OBSERVABILITY] Generating Impact Certificate for Donor ${donor.id} - ${totalDonatedUSD} USD across ${communitiesSupported} communities`);

        // Generate PDF Stream
        const stream = await renderToStream(
            <ImpactCertificate
                donorName={donor.name || 'Generous Donor'}
                totalDonated={totalDonatedUSD}
                communitiesSupported={communitiesSupported}
            />
        );

        // Convert the Node.js ReadableStream to a Web Response Stream
        const webStream = new ReadableStream({
            start(controller) {
                stream.on('data', (chunk) => controller.enqueue(chunk));
                stream.on('end', () => controller.close());
                stream.on('error', (err) => controller.error(err));
            }
        });

        return new NextResponse(webStream, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Impact_Certificate_${new Date().getFullYear()}.pdf"`,
            },
        });

    } catch (error) {
        console.error("[OBSERVABILITY] Certificate Generation Error:", error);
        return new NextResponse("Failed to generate certificate", { status: 500 });
    }
}
