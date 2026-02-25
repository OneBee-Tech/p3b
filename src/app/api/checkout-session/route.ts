import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { programId, childId, amount, frequency } = body;

        // 1. Validation
        if (!programId || !amount || !frequency) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const program = await prisma.program.findUnique({
            where: { id: programId }
        });

        if (!program) {
            return NextResponse.json({ error: 'Program not found' }, { status: 404 });
        }

        // Fetch child name if sponsoring a specific child
        let childDisplayName: string | null = null;
        if (childId) {
            const registryChild = await prisma.registryChild.findUnique({
                where: { id: childId },
                select: { displayName: true }
            });
            childDisplayName = registryChild?.displayName ?? null;
        }

        // 2. Funding Cap Enforcement
        const fundingCurrent = Number(program.fundingCurrent);
        const fundingGoal = Number(program.fundingGoal);

        if (program.isLocked || fundingCurrent >= fundingGoal || program.status === 'FULLY_FUNDED') {
            // Auto-lock if it somehow surpassed without locking
            if (!program.isLocked || program.status !== 'FULLY_FUNDED') {
                await prisma.program.update({
                    where: { id: programId },
                    data: { isLocked: true, status: 'FULLY_FUNDED' }
                });
            }
            return NextResponse.json({
                error: 'Program Fully Funded',
                code: 'PROGRAM_LOCKED'
            }, { status: 400 });
        }

        // 3. Checkout Session Creation
        const isDaily = frequency === 'daily';
        const isMonthly = frequency === 'monthly';
        const isYearly = frequency === 'yearly';
        const isSubscription = isDaily || isMonthly || isYearly;
        const unitAmount = Math.round(amount * 100); // Convert USD to cents

        const sessionData: any = {
            payment_method_types: ['card'],
            mode: isSubscription ? 'subscription' : 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?programId=${programId}${childId ? `&childId=${childId}` : ''}&canceled=true`,
            metadata: {
                programId,
                childId: childId || '',
                allocationModel: 'COMMUNITY_POOL',
                amount: amount.toString()
            },
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: childDisplayName
                                ? `Help ${childDisplayName}`
                                : `Support ${program.name}`,
                            description: childDisplayName
                                ? `Sponsoring ${childDisplayName}'s education, learning materials, and wellbeing services.`
                                : `Contribution to the ${program.name} Community Fund.`,
                        },
                        unit_amount: unitAmount,
                        ...(isSubscription ? {
                            recurring: {
                                interval: isYearly ? 'year' : isDaily ? 'day' : 'month',
                            }
                        } : {})
                    },
                    quantity: 1,
                },
            ],
        };

        // If subscription, metadata goes into subscription_data
        if (isSubscription) {
            sessionData.subscription_data = {
                metadata: sessionData.metadata
            };
        }

        const session = await stripe.checkout.sessions.create(sessionData);

        return NextResponse.json({ sessionId: session.id, url: session.url });

    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
