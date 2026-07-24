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

    // 0.5b Seed Our Story Sections
    const ourStorySectionsData = [
        {
            sectionKey: 'storyHero',
            title: 'Our Story Hero',
            content: '',
            metadata: {
                version: 'v1',
                order: 1,
                component: 'hero',
                layout: 'full-bg',
                featured: true,
                badge: 'Our Story',
                breadcrumb: 'Home / Our Story',
                readingTime: '4 min read',
                heading: 'A Small Idea With the Power to Build Big Futures',
                description: 'What happens if many people each give one dollar a day?',
                backgroundImage: {
                    src: '/images/placeholders/hero-new.jpg',
                    alt: 'Children in a classroom learning together',
                    caption: 'Every dollar creates a new opportunity.'
                },
                ctas: [
                    { label: 'Sponsor a Child', href: '/sponsor', variant: 'primary' },
                    { label: 'See How It Works', href: '/how-it-works', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'storyIdea',
            title: 'How the Idea Began',
            content: '',
            metadata: {
                version: 'v1',
                order: 2,
                component: 'editorial',
                layout: 'image-left',
                style: 'narrative',
                heading: 'Why Many Believe Impact Requires Large Donations',
                body: 'We grew up believing that to change the world, you needed a foundation, a massive grant, or extreme wealth. One dollar is insignificant in developed countries—it cannot even buy a cup of coffee. But when aggregated and sent directly to developing communities, that same dollar becomes transformative.',
                quote: {
                    text: 'Generosity should be accessible to everyone—not only those able to make large donations.',
                    author: 'Our Core Philosophy'
                },
                image: {
                    src: '/images/placeholders/classroom-study.jpg',
                    alt: 'Students studying diligently',
                    caption: 'Transforming small change into massive impact.'
                }
            }
        },
        {
            sectionKey: 'storyFounderBio',
            title: 'About Our Founder',
            content: '',
            metadata: {
                version: 'v1',
                order: 3,
                component: 'editorial',
                layout: 'image-right',
                style: 'narrative',
                heading: 'The Journey from Dubai to Canada',
                body: 'Sarah Haider moved from Dubai to Canada and observed stark contrasts in educational access. This sparked a question: How can we bridge this gap sustainably?',
                quote: {
                    text: 'It became impossible to ignore the disparity in opportunity.',
                    author: 'Sarah Haider'
                },
                image: {
                    src: '/images/placeholders/founder.jpg',
                    alt: 'Sarah Haider',
                    caption: 'Sarah Haider, Youth Founder'
                }
            }
        },
        {
            sectionKey: 'storyFounderLetter',
            title: 'Founder Letter',
            content: '',
            metadata: {
                version: 'v1',
                order: 4,
                component: 'quoteBlock',
                style: 'narrative letter',
                featured: true,
                quote: {
                    text: "Education is the most powerful weapon which you can use to change the world. Our mission is to ensure every child gets that chance. We started this initiative not just to raise funds, but to build a global community connected by the simple belief that everyone deserves an education.",
                    author: "Sarah Haider",
                    role: "Youth Founder"
                }
            }
        },
        {
            sectionKey: 'storyMission',
            title: 'Mission',
            content: '',
            metadata: {
                version: 'v1',
                order: 5,
                component: 'cardSequence',
                style: 'hierarchical',
                heading: 'Mission',
                items: [
                    { title: 'Educate', description: 'Provide sustainable educational access to every child in need.' },
                    { title: 'Empower', description: 'Equip local communities with the resources to thrive.' },
                    { title: 'Elevate', description: 'Raise the standard of living through knowledge and skills.' }
                ]
            }
        },
        {
            sectionKey: 'storyVision',
            title: 'Vision',
            content: '',
            metadata: {
                version: 'v1',
                order: 6,
                component: 'editorial',
                layout: 'image-left',
                heading: 'Vision',
                body: 'A world where every child can learn safely, without the burden of financial constraints holding back their potential. We envision communities transformed by a generation of educated, empowered leaders.'
            }
        },
        {
            sectionKey: 'storyPurpose',
            title: 'Purpose',
            content: '',
            metadata: {
                version: 'v1',
                order: 7,
                component: 'cardSequence',
                style: 'hierarchical',
                heading: 'Purpose',
                items: [
                    { title: 'Connection', description: 'Connect resources from those who have them to those who need them most.' },
                    { title: 'Sustainability', description: 'Build lasting ecosystems of support rather than short-term fixes.' },
                    { title: 'Transparency', description: 'Ensure complete visibility into how every dollar is spent.' }
                ]
            }
        },
        {
            sectionKey: 'storyValues',
            title: 'Our Values',
            content: '',
            metadata: {
                version: 'v1',
                order: 8,
                component: 'contentGrid',
                style: 'reflective',
                heading: 'Our Values',
                items: [
                    { title: 'Dignity', description: 'Treating every child and family with absolute respect.', icon: 'UserHeart' },
                    { title: 'Transparency', description: '100% of your dollar reaches the classroom.', icon: 'ShieldCheck' },
                    { title: 'Accountability', description: 'Rigorous tracking and reporting of outcomes.', icon: 'CheckCircle' },
                    { title: 'Opportunity', description: 'Unlocking potential through education.', icon: 'Star' },
                    { title: 'Child Safety', description: 'Creating secure environments for learning.', icon: 'Lock' },
                    { title: 'Long-Term Commitment', description: 'Staying until the work is truly done.', icon: 'Clock' }
                ]
            }
        },
        {
            sectionKey: 'storyWhyEducation',
            title: 'Why Education Changes Everything',
            content: '',
            metadata: {
                version: 'v1',
                order: 9,
                component: 'processFlow',
                flowDirection: 'vertical',
                heading: 'Why Education Changes Everything',
                description: 'The impact of schooling extends far beyond the classroom.',
                items: [
                    'Education',
                    'Employment',
                    'Financial Stability',
                    'Family',
                    'Community',
                    'Future Generations'
                ]
            }
        },
        {
            sectionKey: 'storyJourney',
            title: 'Our Journey',
            content: '',
            metadata: {
                version: 'v1',
                order: 10,
                component: 'processFlow',
                flowDirection: 'horizontal',
                heading: 'Our Journey',
                items: [
                    'Growing Up',
                    'Recognizing the Problem',
                    'The Question',
                    'The Idea',
                    'The Future'
                ]
            }
        },
        {
            sectionKey: 'storyWhyOneDollar',
            title: 'Why One Dollar?',
            content: '',
            metadata: {
                version: 'v1',
                order: 11,
                component: 'editorial',
                layout: 'image-right',
                featured: true,
                heading: 'Why One Dollar?',
                body: 'We chose one dollar because it democratizes generosity. It proves that you do not need to be a millionaire to make a difference. When thousands of people commit just one dollar a day, the collective impact is staggering.',
                quote: {
                    text: 'Generosity should be accessible to everyone—not only those able to make large donations.',
                    author: 'Our Philosophy'
                }
            }
        },
        {
            sectionKey: 'storyWhySmall',
            title: 'Why Smaller Communities?',
            content: '',
            metadata: {
                version: 'v1',
                order: 12,
                component: 'editorial',
                layout: 'image-left',
                style: 'narrative',
                heading: 'Why Smaller Communities?',
                body: 'We focus our efforts on smaller towns and rural communities where resources are scarce but community bonds are strong. This allows for responsible stewardship, measurable impact, and long-term sustainability.',
                image: {
                    src: '/images/placeholders/feature-why.jpg',
                    alt: 'Rural community learning center',
                    caption: 'Targeted support where it is needed most.'
                }
            }
        },
        {
            sectionKey: 'storyApproach',
            title: 'What Makes Our Approach Different',
            content: '',
            metadata: {
                version: 'v1',
                order: 13,
                component: 'contentGrid',
                style: 'reflective',
                heading: 'What Makes Our Approach Different',
                items: [
                    { title: 'Education First', description: 'We believe education is the root solution to systemic poverty.', icon: 'Star' },
                    { title: 'Transparency', description: 'Every transaction is documented and visible.', icon: 'ShieldCheck' },
                    { title: 'Long-Term Thinking', description: 'We commit to a child for their entire educational journey.', icon: 'Clock' },
                    { title: 'Responsible Stewardship', description: 'We maximize the value of every single dollar.', icon: 'Heart' }
                ]
            }
        },
        {
            sectionKey: 'storyMeasurement',
            title: 'How We Measure Success',
            content: '',
            metadata: {
                version: 'v1',
                order: 14,
                component: 'editorial',
                layout: 'image-right',
                heading: 'How We Measure Success',
                body: 'We don’t measure success by donation volume. We measure it through tangible educational outcomes: school enrollment rates, daily attendance, academic progress, graduation rates, and ultimately, community impact.'
            }
        },
        {
            sectionKey: 'storyPromise',
            title: 'Our Promise',
            content: '',
            metadata: {
                version: 'v1',
                order: 15,
                component: 'contentGrid',
                style: 'reflective',
                heading: 'Our Promise',
                items: [
                    { title: 'Children First', icon: 'UserHeart' },
                    { title: 'Transparency', icon: 'ShieldCheck' },
                    { title: 'Accountability', icon: 'CheckCircle' },
                    { title: 'Respect', icon: 'Heart' },
                    { title: 'Continuous Improvement', icon: 'Star' },
                    { title: 'Long-Term Educational Impact', icon: 'Clock' }
                ]
            }
        },
        {
            sectionKey: 'storyRegistration',
            title: 'Registration & Accountability',
            content: '',
            metadata: {
                version: 'v1',
                order: 16,
                component: 'trustCards',
                style: 'compact summary',
                heading: 'Registration & Accountability',
                description: 'We are a legally registered entity committed to absolute transparency and compliance.',
                items: [
                    { title: 'Registered Non-Profit', description: 'Fully compliant with charity regulations.', icon: 'ShieldCheck', value: '123456789 RR0001' },
                    { title: 'Audited Financials', description: 'Strict append-only ledger of every dollar spent.', icon: 'FileText' },
                    { title: '100% Allocation', description: 'Directly funding educational ecosystems.', icon: 'CheckCircle' }
                ],
                ctas: [
                    { label: 'View Transparency Info', href: '/transparency', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'storyCTA',
            title: 'Final CTA',
            content: '',
            metadata: {
                version: 'v1',
                order: 17,
                component: 'ctaSection',
                heading: 'Join Our Story',
                description: 'Every Great Story Begins With One Small Step.',
                ctas: [
                    { label: 'Sponsor a Child', href: '/sponsor', variant: 'primary' },
                    { label: 'See How It Works', href: '/how-it-works', variant: 'secondary' }
                ]
            }
        }
    ]

    for (const section of ourStorySectionsData) {
        await prisma.homepageSection.upsert({
            where: { sectionKey: section.sectionKey },
            update: section,
            create: section,
        })
    }
    console.log('📄 Our Story Sections seeded')

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
