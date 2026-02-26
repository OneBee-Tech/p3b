"use server";

import { getChildImpactSummary } from "@/lib/impactNarrativeEngine";
import { trackImpactEvent as track } from "@/lib/analyticsTracker";
import { auth } from "@/auth";

export async function getChildImpactSummaryAction(childId: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    return getChildImpactSummary(childId);
}

export async function trackImpactEventAction(eventType: "EMAIL_OPENED" | "DASHBOARD_NARRATIVE_VIEWED" | "MILESTONE_CLICKED", childId: string) {
    const session = await auth();
    if (!session?.user) return; // Silent fail for analytics

    return track(eventType, session.user.id || "", childId);
}
