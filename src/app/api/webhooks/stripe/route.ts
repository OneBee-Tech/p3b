import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as any;

    if (event.type === "checkout.session.completed") {
        // Handle successful donation
        console.log("Donation successful:", session.id);

        // TODO: Create Donation record in DB
        // TODO: Create Sponsorship record if subscription
        // TODO: Update Child status
    }

    if (event.type === "invoice.payment_succeeded") {
        // Handle recurring payment success
    }

    if (event.type === "invoice.payment_failed") {
        // Handle failed payment
    }

    return new NextResponse(null, { status: 200 });
}
