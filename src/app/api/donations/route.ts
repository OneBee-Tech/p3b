import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const settingsUrl = absoluteUrl("/dashboard");

export async function POST(req: Request) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { amount, childId, tier, timeframe } = body;

        if (!amount || !childId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Create Stripe Checkout Session
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: absoluteUrl(`/dashboard?success=true`),
            cancel_url: absoluteUrl(`/sponsor/${childId}?canceled=true`),
            payment_method_types: ["card"],
            mode: timeframe === "monthly" ? "subscription" : "payment",
            billing_address_collection: "auto",
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: `Sponsorship for Child #${childId}`,
                            description: `${tier} Sponsorship Tier`,
                        },
                        unit_amount: Math.round(amount * 100), // cents
                        recurring: timeframe === "monthly" ? { interval: "month" } : undefined,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user.id || "",
                childId: childId,
                tier: tier,
            },
        });

        return NextResponse.json({ url: stripeSession.url });
    } catch (error) {
        console.log("[DONATIONS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
