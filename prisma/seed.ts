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
                description: 'Every classroom begins with opportunity. Every future begins with someone willing to care.',
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
        // CHAPTER 1: Introduction
        {
            sectionKey: 'storyHero',
            title: 'Our Story Hero',
            content: '',
            metadata: {
                version: 'v4',
                order: 1,
                component: 'hero',
                layout: 'full-bg',
                featured: true,
                badge: 'Our Story',
                breadcrumb: 'Home / Our Story',
                heading: 'A Small Idea With the Power to Build Big Futures',
                description: 'What happens if many people each give one dollar a day?',
                secondaryDescription: 'One dollar is insignificant in developed countries—it cannot even buy a cup of coffee. But when aggregated and sent directly to developing communities, that same dollar becomes transformative. It provides school fees, books, and uniforms. A single dollar can begin a journey of lifelong opportunity.',
                backgroundImage: {
                    src: '/images/placeholders/story-hero-happy-children.jpg',
                    alt: 'Joyful school children in uniform raising their hands eager to learn',
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
                version: 'v3',
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
        // CHAPTER 2: The Founder
        {
            sectionKey: 'storyFounderBio',
            title: 'The Realization',
            content: '',
            metadata: {
                version: 'v3',
                order: 3,
                component: 'editorial',
                layout: 'image-right',
                style: 'narrative',
                heading: 'A Disparity Too Great to Ignore',
                body: 'Moving from Dubai to Canada, our founder Sarah Haider experienced different educational systems and observed a stark contrast. It became painfully clear that brilliant minds were being left behind simply because of where they were born. Opportunity should not be determined by geography. This realization sparked a question: How can we bridge this gap sustainably without relying solely on massive, unpredictable grants?',
                image: {
                    src: '/images/placeholders/founder.jpg',
                    alt: 'Sarah Haider',
                    caption: 'The journey to accessible education.'
                }
            }
        },
        {
            sectionKey: 'storyFounderLetter',
            title: 'Founder Letter',
            content: '',
            metadata: {
                version: 'v3',
                order: 4,
                component: 'quoteBlock',
                style: 'narrative letter',
                featured: true,
                quote: {
                    text: "We didn't start this to be just another charity. We wanted to build a movement—a community connected by the profound belief that generosity should be accessible to everyone, and that every single child deserves the dignity of an education.",
                    author: "Sarah Haider",
                    role: "Youth Founder"
                }
            }
        },
        // CHAPTER 3: Core Philosophy
        {
            sectionKey: 'storyMissionVisionPurpose',
            title: 'Mission, Vision & Purpose',
            content: '',
            metadata: {
                version: 'v3',
                order: 5,
                component: 'cardSequence',
                style: 'editorial',
                heading: 'Our Mission, Vision & Purpose',
                description: 'Every decision we make is guided by three enduring principles that shape our work and our commitment to every child.',
                items: [
                    { title: 'Mission', description: 'To provide sustainable educational access and empower local communities with the resources they need to thrive.' },
                    { title: 'Vision', description: 'A world where every child can learn safely, without the burden of financial constraints holding back their potential.' },
                    { title: 'Purpose', description: 'To connect resources from those who have them to those who need them most, building lasting ecosystems of support.' }
                ],
                footerText: 'Our Mission defines what we do. Our Vision defines where we want to go. Our Purpose reminds us why every child matters.'
            }
        },
        {
            sectionKey: 'storyDifference',
            title: 'What Makes Us Different',
            content: '',
            metadata: {
                version: 'v3',
                order: 6,
                component: 'contentGrid',
                heading: 'What Makes Us Different',
                items: [
                    { title: 'Accessible Giving', description: 'Generosity isn’t reserved for the wealthy. $1 a day allows anyone to change a life.', icon: 'HeartHandshake' },
                    { title: 'Education First', description: 'We believe education is the single most effective way to break the cycle of poverty.', icon: 'Star' },
                    { title: 'Transparent Impact', description: 'Every transaction is documented. You see exactly where your dollar goes.', icon: 'ShieldCheck' },
                    { title: 'Long-Term Change', description: 'We commit to a child for their entire educational journey, not just a season.', icon: 'Clock' }
                ]
            }
        },
        // CHAPTER 4: The Impact
        {
            sectionKey: 'storyWhyEducation',
            title: 'Why Education Changes Everything',
            content: '',
            metadata: {
                version: 'v5',
                order: 7,
                component: 'editorial',
                layout: 'image-left',
                heading: 'Why Education Changes Everything',
                body: 'Education creates more than academic knowledge. It builds confidence, opportunity, and independence. It leads to stronger families and healthier communities. The impact of a single classroom extends far beyond its walls.',
                quote: {
                    text: 'When you educate a child, you don’t just change their life—you change the trajectory of an entire family.',
                    author: 'The Power of the Classroom'
                },
                image: {
                    src: '/images/placeholders/classroom-study.jpg',
                    alt: 'Children eager to learn in a vibrant classroom',
                    caption: 'Education changes lives—one classroom at a time.'
                },
                transitionSentence: 'Education does not stop at the classroom door. Its impact grows outward, influencing careers, strengthening families, supporting communities, and creating opportunities that extend across generations.',
                timelineHeading: 'WHAT EDUCATION CAN CHANGE',
                timelineSubheading: 'One opportunity creates generations of impact.',
                timeline: [
                    { label: 'Education', description: 'Access to learning', icon: 'BookOpen' },
                    { label: 'Employment', description: 'Better opportunities', icon: 'Briefcase' },
                    { label: 'Financial Stability', description: 'Higher earning potential', icon: 'TrendingUp' },
                    { label: 'Family', description: 'Healthier households', icon: 'Users' },
                    { label: 'Community', description: 'Shared prosperity', icon: 'Heart' },
                    { label: 'Future Generations', description: 'Breaking cycles of poverty', icon: 'Globe' }
                ],
                closingSentence: 'A single opportunity in a classroom today can become a stronger family, a healthier community, and a brighter future tomorrow.'
            }
        },
        // CHAPTER 5: The Model
        {
            sectionKey: 'storyJourney',
            title: 'Our Journey',
            content: '',
            metadata: {
                version: 'v4',
                order: 9,
                component: 'processFlow',
                flowDirection: 'horizontal',
                heading: 'Our Journey',
                description: 'How a simple observation transformed into a global movement for change.',
                items: [
                    { label: 'Growing Up', description: 'Witnessing global educational gaps', icon: 'BookOpen' },
                    { label: 'Recognizing the Problem', description: 'Brilliant minds left behind', icon: 'Users' },
                    { label: 'The Question', description: 'What if everyone gave $1 a day?', icon: 'Heart' },
                    { label: 'The Idea', description: 'Collective micro-donations', icon: 'TrendingUp' },
                    { label: 'The Future', description: 'Education for every child', icon: 'Globe' }
                ]
            }
        },
        {
            sectionKey: 'storyWhyOneDollar',
            title: 'Why One Dollar?',
            content: '',
            metadata: {
                version: 'v3',
                order: 10,
                component: 'editorial',
                layout: 'image-right',
                featured: true,
                heading: 'Why One Dollar?',
                body: 'We chose one dollar because it democratizes generosity. It proves that you do not need to be a millionaire to make a difference. When thousands of people commit just one dollar a day, the collective impact is staggering.',
                quote: {
                    text: 'Generosity should be accessible to everyone—not only those able to make large donations.',
                    author: 'Our Philosophy'
                },
                image: {
                    src: '/images/placeholders/why-one-dollar.png',
                    alt: 'Children looking out of a classroom window with bright smiles',
                    caption: 'Democratizing generosity, one dollar at a time.'
                }
            }
        },
        {
            sectionKey: 'storyWhySmall',
            title: 'Why Smaller Communities?',
            content: '',
            metadata: {
                version: 'v5',
                order: 11,
                component: 'editorial',
                layout: 'image-left',
                style: 'narrative',
                heading: 'Why Smaller Communities?',
                body: 'We focus our efforts on smaller towns and rural communities where resources are scarce but community bonds are strong. This allows for responsible stewardship, measurable impact, and long-term sustainability.',
                image: {
                    src: '/images/placeholders/smaller-communities-new.jpg',
                    alt: 'Joyful group of children smiling in a rural community',
                    caption: 'Targeted support where it is needed most.'
                }
            }
        },
        // CHAPTER 6: Trust
        {
            sectionKey: 'storyValues',
            title: 'Our Values',
            content: '',
            metadata: {
                version: 'v3',
                order: 12,
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
            sectionKey: 'storyPromise',
            title: 'Our Promise',
            content: '',
            metadata: {
                version: 'v3',
                order: 13,
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
                version: 'v3',
                order: 14,
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
        // CHAPTER 7: The Pause
        {
            sectionKey: 'storyPause',
            title: 'The Visual Pause',
            content: '',
            metadata: {
                version: 'v4',
                order: 15,
                component: 'editorial',
                layout: 'centered-image-only',
                heading: 'Every Child Deserves the Chance to Learn.',
                body: 'A classroom can change a life. A single opportunity can change a generation. A single dollar can help make that opportunity possible.',
                image: {
                    src: '/images/placeholders/every-child-deserves.jpg',
                    alt: 'Children sitting together in class holding slates eager to learn',
                    caption: 'Every child deserves the chance to learn.'
                }
            }
        },
        // CHAPTER 8: The Invitation
        {
            sectionKey: 'storyCTA',
            title: 'Final CTA',
            content: '',
            metadata: {
                version: 'v3',
                order: 16,
                component: 'ctaSection',
                heading: 'Be Part of Their Next Chapter',
                description: 'Every child deserves the opportunity to learn, and every contribution helps write a new chapter in someone\'s future. You have the power to change a life today.',
                ctas: [
                    { label: 'Start Your Impact', href: '/sponsor', variant: 'primary' },
                    { label: 'Make a One-Time Gift', href: '/checkout', variant: 'secondary' }
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

    // 0.5c Seed How It Works Sections
    const howItWorksSectionsData = [
        {
            sectionKey: 'hiwHero',
            title: 'How It Works Hero',
            content: '',
            metadata: {
                version: 'v4',
                order: 1,
                component: 'hero',
                layout: 'full-bg',
                featured: true,
                badge: 'How It Works',
                breadcrumb: 'Home / How It Works',
                heading: 'Your $1. A Clear Process. A Child\'s Brighter Future.',
                description: 'See exactly how your contribution moves from your checkout to creating measurable change in a child\'s life.',
                backgroundImage: {
                    src: '/images/placeholders/hero-smiling-girl.png',
                    alt: 'Joyful school children eager to learn',
                },
                trustStrip: [
                    'Verified Children',
                    'Direct Education Payments',
                    'Progress Reports',
                    'Transparent Documentation'
                ]
            }
        },
        {
            sectionKey: 'hiwJourneyOverview',
            title: 'Journey Overview',
            content: '',
            metadata: {
                version: 'v2',
                order: 2,
                component: 'processFlow',
                variant: 'hero',
                heading: 'Your Sponsorship Journey',
                flowDirection: 'horizontal',
                steps: [
                    { title: 'Community', subtitle: 'Finding children', icon: 'MapPin' },
                    { title: 'Assessment', subtitle: 'Verifying need', icon: 'Users' },
                    { title: 'School', subtitle: 'Choosing the best fit', icon: 'School' },
                    { title: 'Budget', subtitle: 'Calculating needs', icon: 'Calculator' },
                    { title: 'Sponsor', subtitle: 'Matching with you', icon: 'Heart' },
                    { title: 'Payments', subtitle: 'Directing funds', icon: 'CreditCard' },
                    { title: 'Documentation', subtitle: 'Confirming enrollment', icon: 'FileText' },
                    { title: 'Progress', subtitle: 'Tracking growth', icon: 'TrendingUp' },
                    { title: 'Annual Review', subtitle: 'Yearly evaluation', icon: 'CheckCircle' }
                ]
            }
        },
        {
            sectionKey: 'hiwChapter1',
            title: 'Chapter 1: Finding the Right Child',
            content: '',
            metadata: {
                version: 'v1',
                order: 3,
                component: 'editorial',
                layout: 'image-right',
                style: 'narrative',
                heading: 'Finding the Right Child',
                body: 'We work closely with trusted community partners, local volunteers, and social workers to identify children who are most at risk of leaving school due to financial hardship. Every child\'s circumstances are rigorously verified before enrollment, ensuring that your support goes exactly where it is needed most. Finally, we select a dependable, affordable local school that can provide safe, consistent education.',
                image: {
                    src: '/images/placeholders/finding-child-documentary.jpg',
                    alt: 'Community assessment process',
                    caption: 'Identifying and verifying need within the community.'
                },
                timelineHeading: 'The Initial Steps',
                timeline: [
                    { title: 'Community Identification', description: 'Referrals from local partners.' },
                    { title: 'Verification', description: 'Financial and circumstance assessment.' },
                    { title: 'School Selection', description: 'Finding a safe, local learning environment.' }
                ]
            }
        },
        {
            sectionKey: 'hiwChapter2',
            title: 'Chapter 2: Building the Education Plan',
            content: '',
            metadata: {
                version: 'v1',
                order: 4,
                component: 'editorial',
                layout: 'image-left',
                style: 'narrative',
                heading: 'Building the Education Plan',
                body: 'Once a child is verified, we build a comprehensive budget that covers their entire academic year—including tuition, uniforms, books, and basic supplies. You step in as their sponsor, providing the critical funding required. We then manage the payments directly with the school and local vendors, ensuring every dollar is used solely for educational purposes.',
                image: {
                    src: '/images/placeholders/classroom-books.jpg',
                    alt: 'Education planning and budgeting',
                    caption: 'Building a comprehensive plan for success.'
                },
                timelineHeading: 'Securing the Foundation',
                timeline: [
                    { title: 'Budget', description: 'Calculating all educational needs.' },
                    { title: 'Sponsor', description: 'Matching the child with a sponsor.' },
                    { title: 'Payments', description: 'Direct, accountable funding to schools.' }
                ]
            }
        },
        {
            sectionKey: 'hiwVisualBreak',
            title: 'Cinematic Visual Break',
            content: '',
            metadata: {
                version: 'v1',
                order: 4.5,
                component: 'editorial',
                layout: 'full-bleed-image',
                heading: '',
                quote: {
                    text: 'Education begins with one opportunity.'
                },
                image: {
                    src: '/images/placeholders/cinematic-break.jpg',
                    alt: 'Child entering classroom'
                }
            }
        },
        {
            sectionKey: 'hiwChapter3',
            title: 'Chapter 3: Following the Journey',
            content: '',
            metadata: {
                version: 'v1',
                order: 5,
                component: 'editorial',
                layout: 'image-right',
                style: 'narrative',
                heading: 'Following the Journey',
                body: 'Transparency is at the heart of our mission. As soon as the child is enrolled, we secure and share the official documentation with you. Throughout the year, we collect academic reports, attendance records, and teacher feedback, summarizing them into regular progress updates. At the end of the year, a comprehensive annual review ensures the child is ready for the next grade.',
                image: {
                    src: '/images/placeholders/child-studying.jpg',
                    alt: 'Teacher reviewing a progress report',
                    caption: 'Documenting every milestone along the way.'
                },
                timelineHeading: 'Tracking Impact',
                timeline: [
                    { title: 'Documentation', description: 'Receipts and enrollment forms.' },
                    { title: 'Reports', description: 'Six-month academic progress updates.' },
                    { title: 'Annual Review', description: 'Evaluating success and preparing for next year.' }
                ]
            }
        },
        {
            sectionKey: 'hiwSupports',
            title: 'What Your Sponsorship Supports',
            content: '',
            metadata: {
                version: 'v1',
                order: 6,
                component: 'whyOneDollar',
                variant: 'grid',
                heading: 'What Your Sponsorship Supports',
                description: 'Your contribution doesn\'t just pay for a seat in a classroom. It provides a complete educational ecosystem.',
                items: [
                    { title: 'Tuition Fees', icon: 'BookOpen' },
                    { title: 'Textbooks & Books', icon: 'Library' },
                    { title: 'Uniforms & Shoes', icon: 'Shirt' },
                    { title: 'School Bag', icon: 'Briefcase' },
                    { title: 'Stationery', icon: 'PenTool' },
                    { title: 'Examination Fees', icon: 'FileText' },
                    { title: 'Learning Materials', icon: 'Clipboard' }
                ],
                featureImage: '/images/placeholders/classroom-study.jpg'
            }
        },
        {
            sectionKey: 'hiwReceives',
            title: 'What You Receive',
            content: '',
            metadata: {
                version: 'v1',
                order: 7,
                component: 'cardSequence',
                heading: 'What You Receive',
                description: 'We believe you deserve to see exactly how your generosity is transforming a life. Here is what you can expect as a sponsor.',
                cards: [
                    { title: 'School Fee Receipts', description: 'Verifiable proof that your funds reached the school.', icon: 'Receipt' },
                    { title: 'Enrollment Confirmation', description: 'Official documentation of the child\'s admission.', icon: 'CheckSquare' },
                    { title: 'Progress Reports', description: 'Academic performance and grades every six months.', icon: 'LineChart' },
                    { title: 'Teacher Feedback', description: 'Insights into the child\'s behavior and participation.', icon: 'MessageCircle' },
                    { title: 'Attendance Updates', description: 'Ensuring the child is consistently present and safe.', icon: 'Calendar' },
                    { title: 'Educational Milestones', description: 'Celebrating key achievements and grade promotions.', icon: 'Award' },
                    { title: 'Approved Photos', description: 'Visual updates of the child\'s journey, strictly safeguarding their dignity.', icon: 'Image' }
                ]
            }
        },
        {
            sectionKey: 'hiwTransparency',
            title: 'Our Promise of Transparency',
            content: '',
            metadata: {
                version: 'v2',
                order: 8,
                component: 'contentBlock',
                variant: 'checkmarks',
                heading: 'Our Promise of Transparency',
                description: 'Trust is not given; it is earned through rigorous accountability and verifiable impact.',
                items: [
                    { title: 'Verified Children', subtitle: 'Every child\'s financial and educational need is rigorously confirmed.' },
                    { title: 'Direct Payments', subtitle: 'Funds go directly to schools and vendors to ensure zero leakage.' },
                    { title: 'Documentation', subtitle: 'You receive receipts and official enrollment forms.' },
                    { title: 'Progress Reports', subtitle: 'Academic updates provided every six months.' },
                    { title: 'Child Safeguarding', subtitle: 'Strict policies protect the dignity and privacy of every student.' },
                    { title: 'Accountability', subtitle: 'Annual reviews guarantee the continued success of the program.' }
                ]
            }
        },
        {
            sectionKey: 'hiwClosing',
            title: 'Editorial Closing',
            content: '',
            metadata: {
                version: 'v1',
                order: 9,
                component: 'editorial',
                layout: 'centered-text-only',
                body: 'Your sponsorship does not end with a payment.\n\nIt begins with a child walking into a classroom.\n\nIt continues through every lesson learned, every report shared, every milestone reached, and every future made possible.\n\nTogether, we turn generosity into opportunity.',
                textHeadingClass: 'text-2xl md:text-4xl text-cinematic-dark font-medium leading-relaxed font-body italic border-none'
            }
        },
        {
            sectionKey: 'hiwCTA',
            title: 'Final CTA',
            content: '',
            metadata: {
                version: 'v1',
                order: 10,
                component: 'ctaSection',
                heading: 'Change a Life Today',
                description: 'Every classroom begins with opportunity. Every future begins with someone willing to care.',
                ctas: [
                    { label: 'Sponsor a Child Now', href: '/sponsor', variant: 'primary' },
                    { label: 'Give a One-Time Gift', href: '/checkout', variant: 'secondary' }
                ]
            }
        }
    ]

    for (const section of howItWorksSectionsData) {
        await prisma.homepageSection.upsert({
            where: { sectionKey: section.sectionKey },
            update: section,
            create: section,
        })
    }
    console.log('📄 How It Works Sections seeded')

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
