"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createRegistryChild(formData: FormData) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const displayName = formData.get("displayName") as string;
    const age = parseInt(formData.get("age") as string, 10);
    const region = formData.get("region") as string;
    const educationLevel = formData.get("educationLevel") as string;
    const sponsorshipNeededMonthly = parseFloat(formData.get("sponsorshipNeededMonthly") as string);
    const maxSponsors = parseInt(formData.get("maxSponsors") as string, 10);
    const status = formData.get("status") as any;
    const privacyMode = formData.get("privacyMode") as any;
    const safeguardingConsent = formData.get("safeguardingConsent") === "true";
    const avatarIllustrationUrl = formData.get("avatarIllustrationUrl") as string;
    const caseNotes = formData.get("caseNotes") as string;
    const referralId = formData.get("referralId") as string;

    const child = await prisma.registryChild.create({
        data: {
            displayName,
            age,
            region,
            educationLevel,
            sponsorshipNeededMonthly,
            maxSponsors,
            status,
            privacyMode,
            safeguardingConsent,
            avatarIllustrationUrl: avatarIllustrationUrl || null,
            caseNotes: caseNotes || null,
            referralId: referralId || null,
            createdByAdminId: session.user.id,
            safeguardingReviewStatus: "PENDING", // Enforce audit workflow
        }
    });

    // Governance: Log action
    await prisma.adminActionLog.create({
        data: {
            adminId: session.user.id,
            actionType: "CREATE_CHILD",
            targetEntity: "RegistryChild",
            targetId: child.id,
            newValue: `Created ${displayName}`,
        }
    });

    revalidatePath("/admin/children");
    redirect("/admin/children");
}

export async function updateRegistryChild(formData: FormData) {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const id = formData.get("id") as string;
    const displayName = formData.get("displayName") as string;
    const age = parseInt(formData.get("age") as string, 10);
    const region = formData.get("region") as string;
    const educationLevel = formData.get("educationLevel") as string;
    const sponsorshipNeededMonthly = parseFloat(formData.get("sponsorshipNeededMonthly") as string);
    const maxSponsors = parseInt(formData.get("maxSponsors") as string, 10);
    const status = formData.get("status") as any;
    const privacyMode = formData.get("privacyMode") as any;
    const safeguardingReviewStatus = formData.get("safeguardingReviewStatus") as any;
    const avatarIllustrationUrl = formData.get("avatarIllustrationUrl") as string;
    const caseNotes = formData.get("caseNotes") as string;

    const child = await prisma.registryChild.update({
        where: { id },
        data: {
            displayName,
            age,
            region,
            educationLevel,
            sponsorshipNeededMonthly,
            maxSponsors,
            status,
            privacyMode,
            safeguardingReviewStatus,
            avatarIllustrationUrl: avatarIllustrationUrl || null,
            caseNotes: caseNotes || null,
        }
    });

    // Governance: Log action
    await prisma.adminActionLog.create({
        data: {
            adminId: session.user.id,
            actionType: "UPDATE_CHILD",
            targetEntity: "RegistryChild",
            targetId: child.id,
            newValue: `Updated ${displayName} (${status}, ${safeguardingReviewStatus})`,
        }
    });

    revalidatePath("/admin/children");
    revalidatePath(`/admin/children/${id}/edit`);
    redirect("/admin/children");
}

