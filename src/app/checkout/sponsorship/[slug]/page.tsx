import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckoutPage from "../../page";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ChildSponsorshipCheckoutPage({ params }: Props) {
    const { slug } = await params;

    const dbChildren = await prisma.registryChild.findMany({
        where: {
            deletedAt: null,
            isArchived: false,
        }
    });

    const child: any = dbChildren.find((c: any) => c.slug === slug || c.id === slug);

    if (!child) return notFound();

    const defaultProgram = await prisma.program.findFirst();

    return CheckoutPage({
        searchParams: Promise.resolve({
            type: "sponsorship",
            childId: child.id,
            programId: defaultProgram?.id
        })
    });
}
