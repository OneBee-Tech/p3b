const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const programs = await prisma.program.findMany();
    console.log(programs);
}
main().finally(() => prisma.$disconnect());
