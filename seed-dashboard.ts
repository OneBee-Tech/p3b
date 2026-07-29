import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding dashboard data for all users...");
    const users = await prisma.user.findMany();
    const children = await prisma.registryChild.findMany({ take: 2 });
    
    if (children.length === 0) {
        console.error("No children in DB to sponsor.");
        return;
    }

    for (const user of users) {
        // Create 2 historical donations
        await prisma.donation.create({
            data: {
                userId: user.id,
                stripePaymentId: `evt_mock_1_${Math.random()}`,
                amount: 30,
                baseAmountUSD: 30,
                currency: "USD",
                status: "SUCCEEDED",
                type: "ONE_TIME",
                allocationBreakdown: {
                    tuition: 15,
                    supplies: 10,
                    infrastructure: 2.5,
                    ops: 2.5
                }
            }
        });

        await prisma.donation.create({
            data: {
                userId: user.id,
                stripePaymentId: `evt_mock_2_${Math.random()}`,
                amount: 30,
                baseAmountUSD: 30,
                currency: "USD",
                status: "SUCCEEDED",
                type: "RECURRING_MONTHLY",
                allocationBreakdown: {
                    tuition: 15,
                    supplies: 10,
                    infrastructure: 2.5,
                    ops: 2.5
                }
            }
        });

        const programId = (await prisma.program.findFirst())?.id;
        if (!programId) continue;

        // Create a sponsorship
        const childId = (await prisma.child.findFirst())?.id;
        
        if (childId) {
            await prisma.sponsorship.create({
                data: {
                    userId: user.id,
                    programId: programId,
                    childId: childId,
                    status: "ACTIVE",
                    monthlyAmount: 30,
                    startDate: new Date()
                }
            });
        }

        // Create a sponsorship assignment
        await prisma.sponsorshipAssignment.create({
            data: {
                donorId: user.id,
                registryChildId: children[0].id,
                status: "ACTIVE",
                startedAt: new Date()
            }
        });
        
        console.log(`Seeded data for user ${user.email}`);
    }
    
    // Create a global snapshot
    const programId = (await prisma.program.findFirst())?.id;
    if (programId) {
        await prisma.programSnapshot.create({
            data: {
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                fundsRaised: 1500,
                studentsImpacted: 50,
                programId: programId
            }
        });
    }

    console.log("Done!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
