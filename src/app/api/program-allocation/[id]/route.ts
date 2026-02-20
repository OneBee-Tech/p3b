import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const program = await prisma.program.findUnique({
            where: { id },
            include: {
                snapshots: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });

        if (!program) {
            return NextResponse.json({ error: 'Program not found' }, { status: 404 });
        }

        // Aggregate Donations for this program
        const donations = await prisma.donation.findMany({
            where: { programId: id, status: 'SUCCEEDED' },
            select: { amount: true, baseAmountUSD: true, allocationBreakdown: true }
        });

        const totalFunded = donations.reduce((sum, d) => sum + Number(d.amount), 0);
        const totalBaseUSD = donations.reduce((sum, d) => sum + Number(d.baseAmountUSD || d.amount), 0);

        // Aggregate across breakdown
        let tuition = 0;
        let supplies = 0;
        let infrastructure = 0;
        let ops = 0;

        donations.forEach(d => {
            if (d.allocationBreakdown) {
                const breakdown: any = d.allocationBreakdown;
                tuition += breakdown.tuition || 0;
                supplies += breakdown.supplies || 0;
                infrastructure += breakdown.infrastructure || 0;
                ops += breakdown.ops || 0;
            }
        });

        const studentsImpacted = program.snapshots[0]?.studentsImpacted || 0;

        return NextResponse.json({
            programId: program.id,
            name: program.name,
            latestStatus: program.status,
            fundingGoal: Number(program.fundingGoal),
            totalFunded,
            totalBaseUSD,
            studentsImpacted,
            allocationBreakdown: {
                tuition,
                supplies,
                infrastructure,
                ops,
                operationalRatio: totalBaseUSD > 0 ? (ops / totalBaseUSD) * 100 : 0
            },
            locked: program.isLocked
        });

    } catch (error: any) {
        console.error('Transparency API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
