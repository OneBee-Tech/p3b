"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Heart, Award, ArrowRight } from "lucide-react";
import { trackImpactEventAction, getChildImpactSummaryAction } from "@/app/actions/impactActions";

interface ImpactNarrativeCardProps {
    childId: string;
    childName: string;
    donorId: string;
    latestAttendance?: number | null;
    latestMilestoneType?: string | null;
}

export function ImpactNarrativeCard({
    childId,
    childName,
    donorId,
    latestAttendance,
    latestMilestoneType
}: ImpactNarrativeCardProps) {
    const [narrative, setNarrative] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchImpact() {
            try {
                // Tracking the view for retention analytics (sampled at 10% on backend)
                await trackImpactEventAction("DASHBOARD_NARRATIVE_VIEWED", childId);
                const text = await getChildImpactSummaryAction(childId);
                if (mounted) setNarrative(text);
            } catch (error) {
                console.error("Failed to load impact narrative", error);
                if (mounted) setNarrative(`We are actively gathering the latest progress updates for ${childName}.`);
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        fetchImpact();

        return () => { mounted = false; };
    }, [childId, donorId, childName]);

    return (
        <Card className="border-l-4 border-l-blue-600 shadow-md">
            <CardHeader className="pb-3 bg-slate-50 border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
                            <Heart className="h-5 w-5 text-blue-600" />
                            Your Impact in Action
                        </CardTitle>
                        <CardDescription>Latest updates on {childName}'s journey</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6 relative">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                        <span className="ml-2 text-sm text-slate-500">Generating latest impact summary...</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-slate-700 italic border-l-2 border-amber-400 pl-4 py-1 leading-relaxed">
                            "{narrative}"
                        </p>

                        <div className="pt-4 flex flex-wrap gap-3 items-center text-sm">
                            {latestAttendance !== undefined && latestAttendance !== null && (
                                <Badge variant="outline" className="bg-slate-50 text-slate-600">
                                    Attendance: {latestAttendance}%
                                </Badge>
                            )}
                            {latestMilestoneType && (
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                                    <Award className="h-3 w-3 mr-1 inline" />
                                    {latestMilestoneType.replace(/_/g, " ")}
                                </Badge>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
