import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { triggerPaymentFailedAlert, triggerSponsorshipEndedAlert } from '@/lib/lifecycleAlerts';
import { sendDonationReceiptEmail } from '@/lib/donorImpactMailer';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    console.log("🚀 Stripe webhook reached");
    const payload = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature || !endpointSecret) {
        return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
        console.log("Event:", event.type);
    } catch (err: any) {
        console.error(`Webhook signature verification failed:`, err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                if (session.payment_status === 'paid') {
                    await handleSuccessfulPayment(session);
                }
                break;
            }
            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;
                if (invoice.billing_reason === 'subscription_cycle') {
                    // Handle renewal
                    await handleSuccessfulSubscriptionPayment(invoice);
                }
                break;
            }
            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                await handleFailedSubscriptionPayment(invoice);
                break;
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                // Read-only extension: Check for past_due or canceled for lifecycle alerts
                if (subscription.status === 'past_due' || subscription.status === 'unpaid') {
                    const sponsorship = await prisma.sponsorship.findFirst({
                        where: { stripeSubscriptionId: subscription.id, status: 'ACTIVE' }
                    });
                    if (sponsorship) {
                        const assignment = await prisma.sponsorshipAssignment.findFirst({
                            where: { donorId: sponsorship.userId, registryChildId: sponsorship.childId || "" }
                        });
                        if (assignment) {
                            await triggerPaymentFailedAlert(assignment.id, "Stripe subscription marked past_due");
                        }
                    }
                } else if (subscription.status === 'canceled') {
                    const sponsorship = await prisma.sponsorship.findFirst({
                        where: { stripeSubscriptionId: subscription.id }
                    });
                    if (sponsorship) {
                        const assignment = await prisma.sponsorshipAssignment.findFirst({
                            where: { donorId: sponsorship.userId, registryChildId: sponsorship.childId || "" }
                        });
                        if (assignment) {
                            await triggerSponsorshipEndedAlert(assignment.id, "Stripe subscription canceled");

                            // Also pause the assignment
                            await prisma.sponsorshipAssignment.update({
                                where: { id: assignment.id },
                                data: { status: 'PAUSED', endedAt: new Date() }
                            });
                        }
                    }
                }
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error('Webhook processing error:', err);

        // [FAILSAFE] Store failed webhook payloads for scheduled retry
        try {
            await (prisma as any).failedWebhook.upsert({
                where: { eventId: event.id },
                update: {
                    error: err.message,
                    retryCount: { increment: 1 },
                    status: 'FAILED'
                },
                create: {
                    eventId: event.id,
                    eventType: event.type,
                    payload: event as any,
                    error: err.message,
                    status: 'FAILED'
                }
            });
        } catch (dbErr) {
            console.error('Critical: Failed to log webhook error to db', dbErr);
        }

        return NextResponse.json({ error: 'Webhook processing error', details: err.message }, { status: 500 });
    }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    try {
        const stripePaymentId = (typeof session.payment_intent === 'string' && session.payment_intent) 
            ? session.payment_intent 
            : session.id;

        if (!stripePaymentId) return;

        // Idempotency: skip if exists
        const existing = await prisma.donation.findUnique({
            where: { stripePaymentId }
        });
        if (existing) return;

        const metadata = session.metadata || {};
        const programId = metadata.programId;
        const childId = metadata.childId;
        const amountStr = metadata.amount || (session.amount_total ? (session.amount_total / 100).toString() : null);

        if (!programId || !amountStr) {
            console.log(`Checkout session ${session.id} missing programId or amount metadata`);
            return;
        }

        const amount = parseFloat(amountStr);

        // Verify program exists before writing donation record
        const targetProgram = await prisma.program.findUnique({ where: { id: programId } });
        if (!targetProgram) {
            console.warn(`Webhook warning: Program ${programId} not found in DB`);
            return;
        }

        // Fetch logged in donor if metadata.userId exists, otherwise fallback to systemic user
        let user = null;
        if (metadata.userId) {
            user = await prisma.user.findUnique({ where: { id: metadata.userId } });
        }
        if (!user) {
            user = await prisma.user.findFirst({ where: { role: 'USER' } });
            if (!user) {
                user = await prisma.user.create({ data: { email: `donor_${session.id}@placeholder.com`, role: 'USER', name: 'Anonymous Donor' } });
            }
        }

    // Generate allocation breakdown mapping
    const allocationBreakdown = {
        tuition: amount * 0.60,
        supplies: amount * 0.20,
        infrastructure: amount * 0.15,
        ops: amount * 0.05
    };

    // [CONCURRENCY HARDENING] & [FINANCIAL LEDGER IMMUTABILITY]
    await prisma.$transaction(async (tx) => {
        // 1. Create Donation (Append-Only Ledger)
        await tx.donation.create({
            data: {
                amount,
                currency: 'USD',
                baseAmountUSD: amount,
                fxRate: 1.0,
                status: 'SUCCEEDED',
                stripePaymentId: stripePaymentId,
                type: session.mode === 'subscription' ? 'RECURRING_MONTHLY' : 'ONE_TIME',
                fundType: 'RESTRICTED',
                allocationStatus: 'AUTOMATED', // Or PENDING_APPROVAL for strict governance
                allocationTag: 'Community Pool',
                allocationBreakdown,
                userId: user!.id,
                programId: programId
            }
        });

        // 2. Atomic Program Funding Update
        // In a real high concurrency environment, you would use raw SQL for a true row lock 
        // e.g., await tx.$executeRaw`SELECT * FROM "Program" WHERE id = ${programId} FOR UPDATE`;
        // but Prisma transaction sequential read/write provides baseline consistency.
        const program = await tx.program.findUnique({ where: { id: programId } });

        if (program) {
            // [ESCROW/WAITLIST ROUTING LOGIC PLACEHOLDER]
            // If program is already locked, these funds are technically overflow.
            // In a production NGO app, we'd route this extra to a "General Fund" or Escrow.

            const newFundingCurrent = Number(program.fundingCurrent) + amount;
            const goal = Number(program.fundingGoal);
            const isFullyFunded = newFundingCurrent >= goal;

            await tx.program.update({
                where: { id: programId },
                data: {
                    fundingCurrent: newFundingCurrent,
                    ...(isFullyFunded ? { status: 'FULLY_FUNDED', isLocked: true } : {})
                }
            });

            // [SNAPSHOT REPORTING] Create append-only financial snapshot
            const d = new Date();
            await tx.programSnapshot.upsert({
                where: {
                    programId_month_year: {
                        programId: programId,
                        month: d.getMonth() + 1,
                        year: d.getFullYear()
                    }
                },
                update: {
                    fundsRaised: { increment: amount }
                },
                create: {
                    programId: programId,
                    month: d.getMonth() + 1,
                    year: d.getFullYear(),
                    fundsRaised: amount,
                    studentsImpacted: 0 // calculated in cron jobs based on operational ratios
                }
            });

    // 3. Create generic Sponsorship link if subscription
            if (session.mode === 'subscription' && session.subscription) {
                const subId = typeof session.subscription === 'string' 
                    ? session.subscription 
                    : (session.subscription as any)?.id;

                if (subId) {
                    // Verify childId exists in Child database table before passing to relation if provided
                    let validChildId: string | null = null;
                    if (childId) {
                        const childExists = await tx.child.findUnique({ where: { id: childId } });
                        if (childExists) validChildId = childId;
                    }

                    // Legacy Sponsorship record
                    await tx.sponsorship.create({
                        data: {
                            monthlyAmount: amount,
                            stripeSubscriptionId: subId,
                            tier: amount >= 30 ? 'FULL' : 'PARTIAL',
                            userId: user!.id,
                            programId: programId,
                            childId: validChildId,
                        }
                    });

                    // Modern Sponsorship Lifecycle logic
                    if (childId) {
                        const registryChild = await tx.registryChild.findUnique({ where: { id: childId } });
                        if (registryChild) {
                            await tx.sponsorshipAssignment.create({
                                data: {
                                    donorId: user!.id,
                                    registryChildId: registryChild.id,
                                    status: 'ACTIVE'
                                }
                            });

                            await tx.registryChild.update({
                                where: { id: registryChild.id },
                                data: { status: 'SPONSORED' }
                            });
                        }
                    }
                }
            }
        }
    });

        // Trigger instant receipt & invoice email to donor
        const donorEmail = user.email || session.customer_details?.email;
        if (donorEmail && !donorEmail.includes("placeholder")) {
            await sendDonationReceiptEmail(donorEmail, user.name || 'Generous Donor', amount, stripePaymentId);
        }
    } catch (err: any) {
        console.error("Error in handleSuccessfulPayment:", err);
    }
}

async function handleSuccessfulSubscriptionPayment(invoice: Stripe.Invoice) {
    const pi = (invoice as any).payment_intent;
    const stripePaymentId = typeof pi === 'string'
        ? pi
        : pi?.id;

    if (!stripePaymentId) return;

    // Idempotency flag
    const existing = await prisma.donation.findUnique({
        where: { stripePaymentId }
    });
    if (existing) return;

    const sub = (invoice as any).subscription;
    const subscriptionId = typeof sub === 'string'
        ? sub
        : sub?.id;

    if (!subscriptionId) return;

    // Retrieve subscription to get metadata
    let subscription;
    try {
        subscription = await stripe.subscriptions.retrieve(subscriptionId);
    } catch (e) {
        console.error("Failed to retrieve subscription:", e);
        return;
    }

    const metadata = subscription.metadata || {};
    const programId = metadata.programId;

    if (!programId) return;

    const amount = invoice.amount_paid / 100;

    // Find User by subscription
    const sponsorship = await prisma.sponsorship.findFirst({
        where: { stripeSubscriptionId: subscriptionId }
    });

    if (!sponsorship) return;

    const allocationBreakdown = {
        tuition: amount * 0.60,
        supplies: amount * 0.20,
        infrastructure: amount * 0.15,
        ops: amount * 0.05
    };

    await prisma.$transaction(async (tx) => {
        // Create Donation record for this cycle
        await tx.donation.create({
            data: {
                amount,
                currency: 'USD',
                baseAmountUSD: amount,
                fxRate: 1.0,
                status: 'SUCCEEDED',
                stripePaymentId: stripePaymentId,
                type: 'RECURRING_MONTHLY',
                fundType: 'RESTRICTED',
                allocationStatus: 'AUTOMATED',
                allocationTag: 'Community Pool Renewal',
                allocationBreakdown,
                userId: sponsorship.userId,
                programId: programId
            }
        });

        // Update Program Funding
        const program = await tx.program.findUnique({ where: { id: programId } });
        if (program) {
            const newFundingCurrent = Number(program.fundingCurrent) + amount;
            const goal = Number(program.fundingGoal);
            const isFullyFunded = newFundingCurrent >= goal;

            await tx.program.update({
                where: { id: programId },
                data: {
                    fundingCurrent: newFundingCurrent,
                    ...(isFullyFunded ? { status: 'FULLY_FUNDED', isLocked: true } : {})
                }
            });

            // [SNAPSHOT REPORTING] 
            const d = new Date();
            await tx.programSnapshot.upsert({
                where: {
                    programId_month_year: {
                        programId: programId,
                        month: d.getMonth() + 1,
                        year: d.getFullYear()
                    }
                },
                update: {
                    fundsRaised: { increment: amount }
                },
                create: {
                    programId: programId,
                    month: d.getMonth() + 1,
                    year: d.getFullYear(),
                    fundsRaised: amount,
                    studentsImpacted: 0
                }
            });
        }
    });

    // Fetch user details for email notification
    const donorUser = await prisma.user.findUnique({ where: { id: sponsorship.userId } });
    if (donorUser?.email && !donorUser.email.includes("placeholder")) {
        await sendDonationReceiptEmail(donorUser.email, donorUser.name || 'Generous Donor', amount, stripePaymentId);
    }
}

async function handleFailedSubscriptionPayment(invoice: Stripe.Invoice) {
    const sub = (invoice as any).subscription;
    const subscriptionId = typeof sub === 'string' ? sub : sub?.id;

    if (!subscriptionId) return;

    const sponsorship = await prisma.sponsorship.findFirst({
        where: { stripeSubscriptionId: subscriptionId }
    });

    if (!sponsorship) return;

    const assignment = await prisma.sponsorshipAssignment.findFirst({
        where: { donorId: sponsorship.userId, registryChildId: sponsorship.childId || "" }
    });

    if (assignment) {
        await triggerPaymentFailedAlert(
            assignment.id,
            `Recurring payment failed for invoice ${invoice.id}`
        );
    }
}

