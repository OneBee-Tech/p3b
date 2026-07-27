import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const sessionUser = await auth();
        if (!sessionUser?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { sponsorshipId } = body;

        if (!sponsorshipId) {
            return NextResponse.json({ error: 'Missing sponsorship ID' }, { status: 400 });
        }

        const sponsorship = await prisma.sponsorship.findFirst({
            where: {
                id: sponsorshipId,
                userId: sessionUser.user.id
            }
        });

        if (!sponsorship) {
            return NextResponse.json({ error: 'Sponsorship not found' }, { status: 404 });
        }

        let cancelAtDate: Date = new Date();

        // 1. Cancel in Stripe at period end if stripeSubscriptionId exists
        if (sponsorship.stripeSubscriptionId) {
            try {
                const sub: any = await stripe.subscriptions.update(sponsorship.stripeSubscriptionId, {
                    cancel_at_period_end: true
                });
                if (sub?.current_period_end) {
                    cancelAtDate = new Date(sub.current_period_end * 1000);
                }
            } catch (stripeErr: any) {
                console.warn('Stripe cancellation warning:', stripeErr.message);
            }
        }

        // Default end date to 30 days out if not set
        if (!sponsorship.stripeSubscriptionId) {
            cancelAtDate.setDate(cancelAtDate.getDate() + 30);
        }

        // 2. Update DB Sponsorship record
        const updated = await prisma.sponsorship.update({
            where: { id: sponsorship.id },
            data: {
                status: 'CANCELLED',
                endDate: cancelAtDate
            }
        });

        return NextResponse.json({
            success: true,
            endDate: cancelAtDate.toISOString(),
            sponsorship: updated
        });

    } catch (error: any) {
        console.error('Cancel sponsorship error:', error);
        return NextResponse.json({ error: error.message || 'Failed to cancel sponsorship' }, { status: 500 });
    }
}
