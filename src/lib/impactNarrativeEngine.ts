import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { GoogleGenAI } from "@google/genai";

// Initialize AI safely
let ai: GoogleGenAI | null = null;
try {
    if (process.env.GEMINI_API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
} catch (error) {
    console.warn("[ImpactNarrativeEngine] Failed to initialize GoogleGenAI. Will use fallback.", error);
}

/**
 * AI Generation with strict cost, length, and prompt governance.
 * Falls back to structured template on failure or missing API key.
 */
async function generateNarrativeFromData(child: any): Promise<string> {
    const report = child.progressReports[0];
    if (!report) return `We are currently gathering the latest progress updates for ${child.displayName}.`;

    const recentMilestone = child.milestones[0];
    const milestoneText = recentMilestone ? ` They also recently achieved a major milestone: ${recentMilestone.milestoneType.replace(/_/g, ' ')}.` : "";

    // Strict Fallback Template (Failure Isolation)
    const fallbackTemplate = `This reporting period, ${child.displayName} has shown dedicated effort in their education. Their academic performance is noted as: "${report.academicPerformance}". ${report.attendanceRate ? `Their attendance rate is currently at ${report.attendanceRate}%.` : ""}${milestoneText} Thank you for your continued support in making this progress possible.`;

    if (!ai) {
        return fallbackTemplate;
    }

    const prompt = `
You are a professional, compassionate NGO impact reporter.
Write a progress summary for a sponsored child named ${child.displayName}.

STRICT RESTRAINTS:
1. Max length: 120 words.
2. Tone: Uplifting, neutral, dignity-preserving.
3. Reading level: Grade 6.
4. DO NOT mention or reference any past trauma, abuse, or deeply sensitive wellbeing issues.
5. DO NOT hallucinate facts.
6. DO NOT include identifiable personal details beyond their first name, age (${child.age}), and region (${child.region}).
7. Write as a direct update to their sponsor.

DATA PROVIDED:
- Academic Performance: ${report.academicPerformance}
- Attendance Rate: ${report.attendanceRate ? report.attendanceRate + '%' : 'N/A'}
- Teacher Feedback: ${report.teacherFeedback || 'N/A'}
- Wellbeing Notes: ${report.wellbeingNotes || 'N/A'} (Filter out trauma, focus on positive engagement)
- Recent Milestone: ${recentMilestone ? recentMilestone.milestoneType.replace(/_/g, ' ') + ' - ' + recentMilestone.description : 'None'}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                maxOutputTokens: 400,
                temperature: 0.4,
            }
        });

        if (!response.text) throw new Error("Empty AI response");
        return response.text.trim();
    } catch (error) {
        console.error("[ImpactNarrativeEngine] AI Generation Failed, using fallback. Error:", error);
        return fallbackTemplate;
    }
}

/**
 * Cached entry point for the summary engine.
 * Tagged for invalidation when a report is verified or a milestone is logged.
 */
export async function getChildImpactSummary(childId: string): Promise<string> {
    const fetchAndGenerate = unstable_cache(
        async (id: string) => {
            const child = await prisma.registryChild.findUnique({
                where: { id },
                include: {
                    progressReports: {
                        where: { verificationStatus: "VERIFIED" },
                        orderBy: { createdAt: "desc" },
                        take: 1
                    },
                    milestones: {
                        orderBy: { achievedAt: "desc" },
                        take: 1
                    }
                }
            });

            if (!child) return "Sponsorship details are currently being processed.";

            return generateNarrativeFromData(child);
        },
        [`impact-summary-${childId}`],
        {
            revalidate: 86400, // 24 hours
            tags: [`child-${childId}-impact`]
        }
    );

    return fetchAndGenerate(childId);
}
