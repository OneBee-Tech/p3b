import { PrismaClient, ChildStatus, SponsorshipTier, ProgramStatus, EntityType, VerificationStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // 1. Create/Update Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@onebee.tech' },
        update: {},
        create: {
            email: 'admin@onebee.tech',
            name: 'Admin User',
            role: 'ADMIN',
        },
    })
    console.log('👤 Admin user ready:', admin.email)

    // 2. Create/Update Standard Donor
    const donor = await prisma.user.upsert({
        where: { email: 'donor@example.com' },
        update: {},
        create: {
            email: 'donor@example.com',
            name: 'Jane Donor',
            role: 'USER',
        },
    })
    console.log('👤 Donor user ready:', donor.email)

    // 3. Seed Schools
    const schools = [
        {
            id: 'school-1',
            name: 'Hope Community School',
            location: 'Dadu, Sindh',
            capacity: 250,
            establishedDate: new Date('2015-03-10'),
        },
        {
            id: 'school-2',
            name: 'Bright Horizon Academy',
            location: 'Lahore, Punjab',
            capacity: 400,
            establishedDate: new Date('2018-08-20'),
        },
        {
            id: 'school-3',
            name: 'Valley Learning Center',
            location: 'Swat, KPK',
            capacity: 150,
            establishedDate: new Date('2020-01-15'),
        },
    ]

    for (const s of schools) {
        await prisma.school.upsert({
            where: { id: s.id },
            update: {},
            create: s,
        })
    }
    console.log('🏫 Schools seeded')

    // 4. Seed Programs (Communities)
    const programs = [
        {
            id: 'prog-1',
            name: 'Girls Education Initiative - Sindh',
            slug: 'girls-education-sindh',
            description: 'Empowering young girls in rural Sindh with free education, uniforms, and safe transportation.',
            location: 'Sindh, Pakistan',
            fundingGoal: 50000,
            fundingCurrent: 12500,
            status: ProgramStatus.ACTIVE,
            schoolId: 'school-1',
        },
        {
            id: 'prog-2',
            name: 'Digital Literacy for All',
            slug: 'digital-literacy-punjab',
            description: 'Providing laptops and coding classes to underserved children in Lahore.',
            location: 'Punjab, Pakistan',
            fundingGoal: 30000,
            fundingCurrent: 5000,
            status: ProgramStatus.ACTIVE,
            schoolId: 'school-2',
        },
        {
            id: 'prog-3',
            name: 'Clean Water & Classrooms',
            slug: 'clean-water-classrooms',
            description: 'Building sanitation facilities and clean water access for students in Swat.',
            location: 'KPK, Pakistan',
            fundingGoal: 20000,
            fundingCurrent: 18000,
            status: ProgramStatus.ACTIVE,
            schoolId: 'school-3',
        },
        {
            id: 'prog-4',
            name: 'Vocational Training 2025',
            slug: 'vocational-training-2025',
            description: 'Skill development workshops for graduating teenagers.',
            location: 'Karachi, Sindh',
            fundingGoal: 15000,
            fundingCurrent: 2000,
            status: ProgramStatus.ACTIVE,
            schoolId: 'school-1',
        },
        {
            id: 'prog-5',
            name: 'Emergency Flood Relief Education',
            slug: 'flood-relief-education',
            description: 'Temporary schooling and supplies for flood-affected regions.',
            location: 'Balochistan, Pakistan',
            fundingGoal: 10000,
            fundingCurrent: 10000,
            status: ProgramStatus.FULLY_FUNDED,
            isLocked: true,
            schoolId: 'school-1',
        },
    ]

    for (const p of programs) {
        await prisma.program.upsert({
            where: { slug: p.slug },
            update: {
                fundingCurrent: p.fundingCurrent,
                status: p.status,
                isLocked: p.isLocked
            },
            create: p,
        })
    }
    console.log('🌍 Programs seeded')

    // 5. Seed Children
    const childrenData = [
        // High Urgency Waiting
        { name: 'Ayesha', age: 8, gender: 'Female', location: 'Dadu', dream: 'Doctor', programId: 'prog-1', status: ChildStatus.WAITING, story: 'Ayesha walks 5km to school...' },
        { name: 'Fatima', age: 7, gender: 'Female', location: 'Dadu', dream: 'Teacher', programId: 'prog-1', status: ChildStatus.WAITING, story: 'Fatima loves mathematics...' },
        { name: 'Zainab', age: 9, gender: 'Female', location: 'Dadu', dream: 'Pilot', programId: 'prog-1', status: ChildStatus.WAITING, story: 'Zainab wants to fly planes...' },
        // Normal Waiting
        { name: 'Ali', age: 10, gender: 'Male', location: 'Lahore', dream: 'Engineer', programId: 'prog-2', status: ChildStatus.WAITING, story: 'Ali builds toys from scrap...' },
        { name: 'Ahmed', age: 11, gender: 'Male', location: 'Lahore', dream: 'Cricketer', programId: 'prog-2', status: ChildStatus.WAITING, story: 'Ahmed is the team captain...' },
        { name: 'Bilal', age: 12, gender: 'Male', location: 'Lahore', dream: 'Artist', programId: 'prog-2', status: ChildStatus.WAITING, story: 'Bilal paints beautiful landscapes...' },
        { name: 'Omar', age: 6, gender: 'Male', location: 'Swat', dream: 'Police', programId: 'prog-3', status: ChildStatus.WAITING, story: 'Omar wants to protect his village...' },
        { name: 'Sana', age: 7, gender: 'Female', location: 'Swat', dream: 'Nurse', programId: 'prog-3', status: ChildStatus.WAITING, story: 'Sana helps her grandmother...' },
        // Sponsored
        { name: 'Raju', age: 13, gender: 'Male', location: 'Karachi', dream: 'Chef', programId: 'prog-4', status: ChildStatus.SPONSORED, story: 'Raju is learning to cook...' },
        { name: 'Hina', age: 14, gender: 'Female', location: 'Karachi', dream: 'Designer', programId: 'prog-4', status: ChildStatus.SPONSORED, story: 'Hina designs her own clothes...' },
        // Graduated
        { name: 'Yusuf', age: 18, gender: 'Male', location: 'Dadu', dream: 'Business', programId: 'prog-1', status: ChildStatus.GRADUATED, story: 'Yusuf now runs a shop...' },
    ]

    for (const [index, c] of childrenData.entries()) {
        const dob = new Date()
        dob.setFullYear(dob.getFullYear() - c.age)

        await prisma.child.upsert({
            where: { id: `child-${index + 1}` },
            update: {},
            create: {
                id: `child-${index + 1}`,
                name: c.name,
                dob: dob,
                gender: c.gender,
                bio: `${c.name} is a bright student from ${c.location}.`,
                story: c.story,
                photoUrl: `/images/impact/child${(index % 6) + 1}.jpg`, // Cycling through 1-6 placeholder images
                status: c.status,
                annualCost: 360, // $30/mo
                region: c.location,
                educationLevel: 'Primary',
                schoolId: 'school-1', // Defaulting for simplicity in seed
                programId: c.programId,
                visibilityScope: 'PUBLIC',
                moderationStatus: 'APPROVED',
            },
        })
    }
    console.log('👶 Children seeded')

    console.log('✅ Seed completed successfully')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
