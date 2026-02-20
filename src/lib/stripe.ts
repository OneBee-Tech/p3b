import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any, // Using the standard 2023 version; ignoring TS error for newer versions if needed
    appInfo: {
        name: 'OneBee Tech - Community Funding',
        version: '1.0.0',
    },
});
