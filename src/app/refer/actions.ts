"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitReferral(formData: FormData) {
    const referrerName = formData.get("referrerName") as string;
    const email = formData.get("email") as string;
    const childLocation = formData.get("childLocation") as string;
    const educationStatus = formData.get("educationStatus") as string;
    const urgencyLevel = formData.get("urgencyLevel") as any;
    const notes = formData.get("notes") as string;

    // 1. Strict Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    // 2. Database-backed Rate Limiting (Max 3 submissions per email per 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentSubmissions = await prisma.referral.count({
        where: {
            email: email,
            createdAt: {
                gte: twentyFourHoursAgo
            }
        }
    });

    if (recentSubmissions >= 3) {
        throw new Error("Rate limit exceeded. Please try again tomorrow.");
    }

    // 3. Ingestion
    await prisma.referral.create({
        data: {
            referrerName,
            email,
            childLocation,
            educationStatus,
            urgencyLevel: urgencyLevel || "LOW",
            notes: notes || null,
            status: "PENDING"
        }
    });

    revalidatePath("/admin/referrals");
    redirect("/refer?success=true");
}
