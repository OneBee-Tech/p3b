import { PrismaClient, ChildStatus, SponsorshipTier, ProgramStatus, EntityType, VerificationStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // 0. Seed Global Settings
    const globalSettings = await prisma.globalSettings.upsert({
        where: { id: 'default-settings' },
        update: {},
        create: {
            id: 'default-settings',
            organizationName: 'One Dollar. One Child. One Future.',
            registeredOffice: '123 Charity Lane, Hope City, TX 75001',
            contactEmails: {
                info: 'info@onedollaronechild.org',
                sponsor: 'sponsor@onedollaronechild.org',
                partnerships: 'partnerships@onedollaronechild.org',
            },
            socialLinks: {
                facebook: 'https://facebook.com/onedollaronechild',
                twitter: 'https://twitter.com/onedollaronechild',
                instagram: 'https://instagram.com/onedollaronechild',
            },
            craStatus: '501(c)(3) Non-Profit Organization',
            missionStatement: 'To provide education and resources to children in need.',
            visionStatement: 'A world where every child has access to quality education.',
            transparencyWording: 'We are committed to full financial transparency.',
        },
    })
    console.log('⚙️ Global Settings seeded')

    const homepageSectionsData = [
        {
            sectionKey: 'hero',
            title: 'Hero Banner',
            content: '',
            metadata: {
                order: 1,
                status: 'Draft / Source: Client',
                heading: 'One Dollar.\nOne Child.\nOne Future.',
                subheading: 'Give just $1 a day and help a child receive the education they deserve.',
                description: 'One dollar may feel small. But your daily contribution provides school fees, books, and uniforms—giving a child the foundation for a lifelong future.',
                heroImage: '/images/placeholders/hero.jpg', // Semantic placeholder
                ctas: [
                    { label: 'Give $1 a Day', href: '/sponsor', variant: 'primary' },
                    { label: 'See How Sponsorship Works', href: '/how-it-works', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'whyOneDollar',
            title: 'Why One Dollar Matters',
            content: '',
            metadata: {
                order: 2,
                status: 'Draft / Source: Client',
                heading: 'What Can One Dollar Do?',
                description: 'In many communities, just $1 a day fully covers a child’s educational essentials, clearing the path for them to learn and grow without financial barriers.',
                variant: 'grid', 
                items: [
                    { title: 'School Tuition', icon: 'BookOpen' },
                    { title: 'Admission Fees', icon: 'Landmark' },
                    { title: 'Textbooks & Books', icon: 'Library' },
                    { title: 'Stationery', icon: 'PenTool' },
                    { title: 'Uniforms & Shoes', icon: 'Shirt' },
                    { title: 'Classroom Materials', icon: 'Clipboard' },
                ],
                featureImage: '/images/placeholders/classroom-study.jpg',
                ctas: [
                    { label: 'Turn My $1 Into Opportunity', href: '/sponsor', variant: 'primary' }
                ]
            }
        },
        {
            sectionKey: 'sponsorJourney',
            title: 'Sponsor Journey',
            content: '',
            metadata: {
                order: 3,
                status: 'Draft / Source: Client',
                heading: 'Choose Your Impact',
                description: 'Whether you give daily, monthly, or annually, every dollar is a step toward a child’s graduation.',
                options: [
                    {
                        title: 'Daily Impact',
                        amount: '$1',
                        frequency: 'per day',
                        description: 'A simple daily commitment that funds a child’s entire education.',
                        cta: { label: 'Give Daily', href: '/sponsor?type=daily' }
                    },
                    {
                        title: 'Monthly Guardian',
                        amount: '$30',
                        frequency: 'per month',
                        description: 'Provides consistent, reliable support for a child’s learning cycle.',
                        cta: { label: 'Give Monthly', href: '/sponsor?type=monthly' }
                    },
                    {
                        title: 'Annual Patron',
                        amount: '$365',
                        frequency: 'per year',
                        description: 'Secures a child’s education for a full academic year in one meaningful gift.',
                        cta: { label: 'Give Annually', href: '/sponsor?type=annual' }
                    }
                ]
            }
        },
        {
            sectionKey: 'sponsorshipProcess',
            title: 'How Sponsorship Works',
            content: '',
            metadata: {
                order: 4,
                status: 'Draft / Source: Client',
                heading: 'From Your Donation to the Classroom',
                description: 'A transparent journey from your first dollar to a child’s graduation.',
                classroomImage: '/images/placeholders/classroom.jpg',
                steps: [
                    { title: 'Identification', description: 'Local partners refer vulnerable children.' },
                    { title: 'Verification', description: 'Financial needs and circumstances are assessed.' },
                    { title: 'Enrollment', description: 'The child is fully supported in school.' },
                    { title: 'Progress', description: 'You receive regular academic updates.' }
                ],
                ctas: [
                    { label: 'Explore the Process', href: '/how-it-works', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'transparency',
            title: 'Transparency',
            content: '',
            metadata: {
                order: 5,
                status: 'Draft / Source: Client',
                heading: 'Verified Accountability',
                description: 'We ensure 100% of your sponsorship reaches the classroom. Our verified partners and regular reporting mean you always know your impact.',
                highlight: 'Every dollar tracked. Every child supported.',
                ctas: [
                    { label: 'View Our Standards', href: '/transparency', variant: 'primary' },
                    { label: 'Read Reports', href: '/impact', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'founderStory',
            title: 'Founder Story',
            content: '',
            metadata: {
                order: 6,
                status: 'Draft / Source: Client',
                heading: 'A Note From Our Founder',
                description: 'Education is not a luxury; it is a necessity. We empower ecosystems that support children, ensuring no child forfeits their future due to circumstances they cannot control.',
                quote: '“No child should have to forfeit their future due to circumstances they cannot control.”',
                founderImage: '/images/placeholders/founder.jpg',
                ctas: [
                    { label: 'Read Our Story', href: '/our-story', variant: 'primary' }
                ]
            }
        },
        {
            sectionKey: 'cta',
            title: 'Final CTA',
            content: '',
            metadata: {
                order: 7,
                status: 'Draft / Source: Client',
                heading: 'Change a Life Today',
                description: 'Your dollar may seem small, but its impact lasts a lifetime.',
                ctas: [
                    { label: 'Sponsor a Child Now', href: '/sponsor', variant: 'primary' },
                    { label: 'Give a One-Time Gift', href: '/checkout', variant: 'secondary' }
                ]
            }
        }
    ]

    for (const section of homepageSectionsData) {
        await prisma.homepageSection.upsert({
            where: { sectionKey: section.sectionKey },
            update: section,
            create: section,
        })
    }
    console.log('📄 Homepage Sections seeded')

    // 0.6 Seed FAQs
    const faqsData = [
        { id: 'faq-1', question: 'How is my $1 a day allocated?', answer: '100% of your $1 goes directly to the educational and wellbeing programs of the child you sponsor.', order: 1 },
        { id: 'faq-2', question: 'Can I write to my sponsored child?', answer: 'Yes! Our platform provides a secure messaging channel once your sponsorship is confirmed.', order: 2 },
        { id: 'faq-3', question: 'Are my donations tax-deductible?', answer: 'Yes, we are a registered 501(c)(3) non-profit organization. All donations are tax-deductible.', order: 3 },
    ]

    for (const faq of faqsData) {
        await prisma.faq.upsert({
            where: { id: faq.id },
            update: faq,
            create: faq,
        })
    }
    console.log('❓ FAQs seeded')

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
