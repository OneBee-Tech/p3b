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
        const isSubscription = frequency === 'monthly';
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
                            name: `Support ${program.name}`,
                            description: `Contribution to the Community Pool${childId ? ' (including support for a specific child)' : ''}`,
                        },
                        unit_amount: unitAmount,
                        ...(isSubscription ? {
                            recurring: {
                                interval: 'month',
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
