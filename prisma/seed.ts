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
                description: 'One dollar may not buy a cup of coffee, a snack or even a small daily treat.\n\nBut in carefully selected communities, your $1 a day can help cover a child’s essential education costs—including school fees, books, stationery, uniforms and shoes.\n\nThrough One Dollar. One Child. One Future., your small daily contribution becomes part of something much greater:\n\nA child in school.\nA family filled with hope.\nA future with possibilities.',
                ctas: [
                    { label: 'Give $1 a Day', href: '/sponsor', variant: 'primary' },
                    { label: 'See How Sponsorship Works', href: '/how-it-works', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'trustBar',
            title: 'Trust Bar',
            content: '',
            metadata: {
                order: 2,
                status: 'Draft / Source: Client',
                statement: 'Verified children • Carefully selected schools • Direct education payments • Receipts shared • Progress reports every six months'
            }
        },
        {
            sectionKey: 'whyOneDollar',
            title: 'Why One Dollar Matters',
            content: '',
            metadata: {
                order: 3,
                status: 'Draft / Source: Client',
                heading: 'What Can One Dollar Do?',
                description: 'For many of us, one dollar feels insignificant. It may be less than the cost of a cup of coffee, a small snack, or an online purchase we quickly forget.\n\nBut in smaller towns and cities where education costs are more affordable, that same dollar can become part of a child’s complete education support.\n\nWhen given every day, your contribution can help provide:',
                items: [
                    'School tuition',
                    'Admission and academic fees',
                    'Textbooks and notebooks',
                    'Pens, pencils and stationery',
                    'School uniforms and shoes',
                    'Essential classroom materials',
                    'Continued monitoring of the child’s education'
                ],
                highlight: 'One dollar may not change your day. But it can help change a child’s life.',
                ctas: [
                    { label: 'Turn My $1 Into Opportunity', href: '/sponsor', variant: 'primary' }
                ]
            }
        },
        {
            sectionKey: 'whyEducation',
            title: 'Why Quality Education Matters',
            content: '',
            metadata: {
                order: 4,
                status: 'Draft / Source: Client',
                heading: 'One Dollar a Day. One Child’s Education.',
                description: 'Our name represents a simple and direct promise.\n\nWhen you give $1 a day, your contribution is used to support the education of a carefully identified child in a community where this amount can make a meaningful difference.\n\nThe purpose is not to provide a one-time donation and disappear. The purpose is to help a child enrol in a dependable school, attend classes regularly, receive the required books and stationery, have the proper school uniform, continue learning year after year, and develop the confidence to build a better future.',
                highlight: 'You are not simply paying a school fee. You are helping a child stay in school, continue learning and believe in a future beyond poverty.'
            }
        },
        {
            sectionKey: 'sponsorshipProcess',
            title: 'How Sponsorship Works',
            content: '',
            metadata: {
                order: 5,
                status: 'Draft / Source: Client',
                heading: 'A Clear Journey From Your Dollar to the Classroom',
                steps: [
                    { title: 'A child is referred', description: 'A child may be referred through a trusted volunteer, social worker, or local partner.' },
                    { title: 'Circumstances are verified', description: 'We review the child’s situation, including financial circumstances and risk of leaving school.' },
                    { title: 'A suitable school is identified', description: 'We look for a dependable and affordable school that can provide regular teaching and safe learning.' },
                    { title: 'The child is enrolled', description: 'The approved child receives the education support required under the program.' },
                    { title: 'Expenses are paid', description: 'Wherever practical, tuition is paid directly to the school and receipts are collected.' },
                    { title: 'Documentation is shared', description: 'The sponsor receives school fee receipts and enrolment confirmation.' },
                    { title: 'Progress is monitored', description: 'We aim to share academic report cards and educational progress approximately every six months.' }
                ],
                ctas: [
                    { label: 'Learn More About Our Process', href: '/how-it-works', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'donationSupport',
            title: 'What Your Donation Supports',
            content: '',
            metadata: {
                order: 6,
                status: 'Draft / Source: Client',
                heading: 'Small Daily Giving. Complete Educational Support.',
                description: 'Depending on the selected community, school, grade and local costs, your sponsorship may help cover monthly or annual tuition, textbooks, uniforms, shoes, approved academic materials, and program monitoring.',
                highlight: 'Our programs are designed for communities where approximately $1 a day can provide meaningful basic education support.'
            }
        },
        {
            sectionKey: 'sponsorJourney',
            title: 'Sponsor Journey',
            content: '',
            metadata: {
                order: 7,
                status: 'Draft / Source: Client',
                heading: 'Give in the Way That Works for You',
                description: 'The idea remains simple: Give $1 a day. When you are ready to sponsor, you may choose the payment arrangement that works best for you.',
                options: [
                    {
                        title: 'Monthly Sponsorship',
                        amount: '$30',
                        frequency: 'per month',
                        description: 'A simple monthly payment that represents approximately one dollar a day.',
                        cta: { label: 'Give Monthly', href: '/sponsor?type=monthly' }
                    },
                    {
                        title: 'Annual Sponsorship',
                        amount: '$365',
                        frequency: 'per year',
                        description: 'Give the equivalent of one dollar for every day of the year through one annual payment.',
                        cta: { label: 'Give Annually', href: '/sponsor?type=annual' }
                    },
                    {
                        title: 'Complete Education Journey',
                        amount: 'Calculated',
                        frequency: 'one-time',
                        description: 'Fund the remaining school education of one child through one contribution. Based on current grade and local costs.',
                        cta: { label: 'Fund a Complete Education', href: '/contact?type=SPONSORSHIP' }
                    }
                ]
            }
        },
        {
            sectionKey: 'educationImpact',
            title: 'Why Education Changes Lives',
            content: '',
            metadata: {
                order: 8,
                status: 'Draft / Source: Client',
                heading: 'Education Can Change More Than One Life',
                description: 'A child who receives an education may one day become a doctor who serves an underserved community, an engineer who builds safer infrastructure, a teacher who educates hundreds of children, or a skilled professional who supports an entire family.',
                highlight: 'When you educate one child, the impact may continue through an entire family and across generations. That is why your contribution is more than charity. It is a legacy.'
            }
        },
        {
            sectionKey: 'transparency',
            title: 'Transparency',
            content: '',
            metadata: {
                order: 9,
                status: 'Draft / Source: Client',
                heading: 'You Deserve to Know Where Your Support Goes',
                description: 'Trust is not built through promises alone. It is built through clear processes, proper documentation and honest reporting. Our transparency model includes documented child-selection criteria, family verification, direct payments wherever practical, school fee receipts, and academic progress reports.',
                highlight: 'We want sponsors to see the education they are helping create—not simply receive a thank-you message.',
                ctas: [
                    { label: 'View Our Transparency Standards', href: '/transparency', variant: 'primary' },
                    { label: 'View Reports', href: '/impact', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'corporate',
            title: 'Corporate Partnership Preview',
            content: '',
            metadata: {
                order: 10,
                status: 'Draft / Source: Client',
                heading: 'Companies Can Educate Entire Generations',
                description: 'Corporate partners can support as many children as they choose. A business may sponsor 10 children, 100 children, or an entire school cohort. Corporate support can turn social responsibility into measurable educational opportunity.',
                ctas: [
                    { label: 'Explore Corporate Partnerships', href: '/partnership', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'cta',
            title: 'Final CTA',
            content: '',
            metadata: {
                order: 11,
                status: 'Draft / Source: Client',
                heading: 'You May Forget Where You Spent One Dollar Today. A Child May Remember Its Impact for the Rest of Their Life.',
                description: 'Give one dollar a day. Help a child enter a classroom, receive the materials they need and continue building their future.',
                ctas: [
                    { label: 'Start Giving $1 a Day', href: '/sponsor', variant: 'primary' },
                    { label: 'Invite Someone to Join', href: '/get-involved', variant: 'secondary' }
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
