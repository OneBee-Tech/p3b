import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const id = 'clk_general_fund_123';
    const name = 'General Community Fund';
    const slug = 'general-fund';
    const description = 'Pooled funding for the most critical needs across all active programs. (allocationStrategy: dynamic, isPooled: true)';
    const location = 'Global';
    const fundingGoal = 1000000;
    const fundingCurrent = 0;
    const isActive = true;
    const isLocked = false;
    const status = 'ACTIVE';

    const query = `
    INSERT INTO "Program" (id, name, slug, description, location, "fundingGoal", "fundingCurrent", "isActive", "isLocked", status, "updatedAt")
    VALUES ('${id}', '${name}', '${slug}', '${description}', '${location}', ${fundingGoal}, ${fundingCurrent}, ${isActive}, ${isLocked}, '${status}', NOW())
    ON CONFLICT (slug) DO UPDATE SET 
      name = EXCLUDED.name,
      description = EXCLUDED.description,
      "updatedAt" = NOW();
  `;

    await prisma.$executeRawUnsafe(query);
    console.log('Upserted General Fund using Raw SQL:', slug);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error("ERROR MESSAGE:", e.message)
        await prisma.$disconnect()
        process.exit(1)
    })
