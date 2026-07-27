import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckoutPage from "../../page";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ChildSponsorshipCheckoutPage({ params }: Props) {
    const { slug } = await params;

    const registryChild = await prisma.registryChild.findFirst({
        where: { OR: [{ slug }, { id: slug }], deletedAt: null, isArchived: false }
    });

    const childModel = await prisma.child.findFirst({
        where: { OR: [{ id: slug }, { name: { contains: slug, mode: 'insensitive' } }] }
    });

    const childId = childModel?.id || registryChild?.id;

    if (!childId) return notFound();

    const defaultProgram = await prisma.program.findFirst();

    return CheckoutPage({
        searchParams: Promise.resolve({
            type: "sponsorship",
            childId: childId,
            programId: defaultProgram?.id
        })
    });
}
