import { NextResponse } from 'next/server';
import { translate } from 'bing-translate-api';

export async function POST(req: Request) {
    try {
        const { text, to } = await req.json();

        if (!text || !to) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        // Use free Bing Translate API (no key required for this wrapper)
        const res = await translate(text, null, to);
        return NextResponse.json({ translated: res.translation });
    } catch (e: any) {
        console.error("API Translation Error:", e);
        return NextResponse.json({ error: e.message, translated: "" }, { status: 500 });
    }
}
