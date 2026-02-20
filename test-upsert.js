const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Starting upsert...");
        const user = await prisma.user.upsert({
            where: { email: 'donor@example.com' },
            update: {},
            create: {
                email: 'donor@example.com',
                name: 'Alex Donor',
                role: 'USER' // Make sure this matches the Role enum
            }
        });
        console.log('User upserted successfully:', user);
    } catch (e) {
        console.error('Upsert failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
