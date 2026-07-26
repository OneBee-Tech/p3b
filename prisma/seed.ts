import { PrismaClient, ChildStatus, SponsorshipTier, ProgramStatus, EntityType, VerificationStatus, SafeguardingReviewStatus, StoryStatus } from '@prisma/client'

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
            title: "What You'll Receive",
            content: '',
            metadata: {
                version: 'v3',
                order: 7,
                component: 'cardSequence',
                heading: "What You'll Receive",
                description: "Your sponsorship creates more than an educational opportunity.\n\nIt creates a transparent connection between your generosity and a child's progress.\n\nSubject to privacy, safeguarding, and consent requirements, we aim to keep you informed throughout the child's educational journey.",
                cards: [
                    { 
                        title: 'School Fee Receipts', 
                        description: 'Receive documentation showing approved education payments made on behalf of the child.', 
                        icon: 'Receipt',
                        image: '/images/placeholders/receipt-doc.jpg'
                    },
                    { 
                        title: 'Enrollment Confirmation', 
                        description: 'Know when the child begins their educational journey.', 
                        icon: 'FileCheck',
                        image: '/images/placeholders/enrollment-doc.jpg'
                    },
                    { 
                        title: 'Progress Reports', 
                        description: 'Receive academic updates approximately every six months, depending on the school\'s reporting schedule.', 
                        icon: 'TrendingUp',
                        image: '/images/placeholders/report-card.jpg'
                    },
                    { 
                        title: 'Teacher Feedback', 
                        description: 'Where available, receive insights into the child\'s learning and classroom progress.', 
                        icon: 'MessageSquare',
                        image: '/images/placeholders/teacher-notes.jpg'
                    },
                    { 
                        title: 'Attendance Updates', 
                        description: 'Follow the child\'s participation and educational consistency where reporting is available.', 
                        icon: 'CalendarCheck',
                        image: '/images/placeholders/attendance-log.jpg'
                    },
                    { 
                        title: 'Approved Photographs', 
                        description: 'Celebrate important milestones through approved photographs shared with appropriate consent.', 
                        icon: 'Camera',
                        image: '/images/placeholders/approved-photo.jpg'
                    },
                    { 
                        title: 'Educational Milestones', 
                        description: 'Follow the child\'s journey from enrollment through continued academic progress.', 
                        icon: 'Award',
                        image: '/images/placeholders/milestones.jpg'
                    }
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

    // 0.5d Seed Sponsor Page Sections
    const sponsorSectionsData = [
        {
            sectionKey: 'sponsorHero',
            title: 'Sponsor a Child Hero',
            content: '',
            metadata: {
                version: 'v2',
                order: 1,
                component: 'hero',
                layout: 'full-bg',
                heading: 'Every Child Has a Dream.',
                description: 'Every child profile represents a unique educational journey. Learn their story, discover their aspirations, and see how sponsorship helps create lasting opportunities through education.',
                secondaryDescription: 'Together, We Can Help Protect It.',
                backgroundImage: {
                    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920&auto=format&fit=crop',
                    alt: 'Children engaged in classroom learning and studying together',
                },
                ctas: [
                    { label: 'Meet the Children', href: '#meet-children', variant: 'primary' },
                    { label: 'How Sponsorship Works', href: '/how-it-works', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'sponsorPoeticMission',
            title: 'Why Sponsorship Matters',
            content: '',
            metadata: {
                version: 'v2',
                order: 2,
                component: 'editorial',
                layout: 'centered-text-only',
                eyebrow: 'Why Sponsorship Matters',
                heading: 'One Child. One Opportunity. One Future.',
                body: 'Education provides more than access to a classroom.\n\nIt builds confidence. Protects childhood. Creates opportunity. Strengthens families. Transforms communities.',
                textHeadingClass: 'text-3xl sm:text-4xl md:text-6xl text-cinematic-dark font-bold leading-tight font-heading max-w-4xl mx-auto'
            }
        },
        {
            sectionKey: 'sponsorProvides',
            title: 'What Your Sponsorship Provides',
            content: '',
            metadata: {
                version: 'v2',
                order: 4,
                component: 'cardSequence',
                heading: 'What Your Sponsorship Provides',
                description: 'Your support creates a complete, sustainable educational ecosystem for the child.',
                cards: [
                    { title: 'Tuition Fees', description: 'Directly paid to partner schools to guarantee uninterrupted classroom access.', icon: 'Receipt' },
                    { title: 'Textbooks & Books', description: 'Essential curriculum textbooks and learning materials for every academic term.', icon: 'FileCheck' },
                    { title: 'School Uniforms', description: 'Tailored uniforms restoring pride, belonging, and confidence.', icon: 'ShieldCheck' },
                    { title: 'School Shoes', description: 'Sturdy, protective footwear for safe daily walks to school.', icon: 'Check' },
                    { title: 'School Bags', description: 'High-quality backpacks to carry learning materials safely.', icon: 'FileText' },
                    { title: 'Stationery Supplies', description: 'Complete writing kits, notebooks, and essential classroom supplies.', icon: 'FileText' },
                    { title: 'Learning Materials', description: 'Core study aids, drawing tools, and foundational educational resources.', icon: 'Award' },
                    { title: 'Academic Monitoring', description: 'Bi-annual progress reports, grade verification, and teacher feedback.', icon: 'TrendingUp' }
                ]
            }
        },
        {
            sectionKey: 'sponsorJourney',
            title: 'The Sponsorship Journey',
            content: '',
            metadata: {
                version: 'v2',
                order: 5,
                component: 'processFlow',
                heading: 'How Your Support Works',
                description: 'A concise four-step transparent journey.',
                flowDirection: 'horizontal',
                variant: 'compact',
                steps: [
                    { title: 'Sponsor', subtitle: 'Select a child profile', icon: 'Heart' },
                    { title: 'Verified Matching', subtitle: 'Official verification', icon: 'CheckCircle' },
                    { title: 'Education Begins', subtitle: 'Direct school enrollment', icon: 'School' },
                    { title: 'Receive Progress Updates', subtitle: 'Bi-annual report cards', icon: 'TrendingUp' }
                ]
            }
        },
        {
            sectionKey: 'sponsorTrust',
            title: 'Built on Uncompromising Trust',
            content: '',
            metadata: {
                version: 'v1',
                order: 6,
                component: 'contentBlock',
                variant: 'checkmarks',
                heading: 'Built on Uncompromising Trust',
                description: 'We ensure complete transparency, security, and dignity at every stage of the educational journey.',
                items: [
                    { title: 'Verified Children', subtitle: 'Every child\'s financial and educational need is rigorously confirmed before enrollment.' },
                    { title: 'Carefully Selected Schools', subtitle: 'We partner exclusively with accredited community schools maintaining high standards.' },
                    { title: 'Direct Education Payments', subtitle: '100% of sponsorship funds go directly to schools and suppliers with zero cash leakage.' },
                    { title: 'Progress Reports', subtitle: 'You receive academic progress reports and official school updates twice a year.' },
                    { title: 'Safeguarding Policies', subtitle: 'Strict child protection and privacy policies protect every student\'s dignity.' }
                ]
            }
        },
        {
            sectionKey: 'sponsorClosing',
            title: 'Mission Closing',
            content: '',
            metadata: {
                version: 'v2',
                order: 7,
                component: 'editorial',
                layout: 'centered-text-only',
                heading: 'Every Child Has Potential.',
                body: 'One sponsorship can help unlock a lifetime of opportunity.\n\nEducation changes futures. Communities grow stronger. Hope becomes reality.',
                textHeadingClass: 'text-3xl md:text-5xl text-cinematic-dark font-extrabold leading-tight font-heading max-w-4xl mx-auto'
            }
        }
    ]

    for (const section of sponsorSectionsData) {
        await prisma.homepageSection.upsert({
            where: { sectionKey: section.sectionKey },
            update: section,
            create: section,
        })
    }
    console.log('📄 Sponsor Page Sections seeded')

    // 0.5e Seed Our Impact Page Sections
    const impactSectionsData = [
        {
            sectionKey: 'impactHero',
            title: 'Our Impact Hero',
            content: '',
            metadata: {
                version: 'v3-trust-experience',
                order: 1,
                component: 'hero',
                heading: 'Every Sponsorship Becomes a Documented Story of Progress.',
                description: 'We are building an open, verifiable sponsorship system where tuition, uniforms, and learning outcomes are tracked with complete transparency.',
                secondaryDescription: 'Most charities ask for trust. We believe trust should be documented.',
                backgroundImage: {
                    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920&auto=format&fit=crop',
                    alt: 'Documentary photo of children studying together',
                },
                ctas: [
                    { label: 'Sponsor a Child ($1/Day)', href: '/sponsor-a-child#meet-children', variant: 'primary' },
                    { label: 'Explore Transparency Protocol', href: '/transparency', variant: 'secondary' }
                ]
            }
        },
        {
            sectionKey: 'impactPhilosophy',
            title: 'Why We Exist & Three Promises',
            content: '',
            metadata: {
                version: 'v3-trust-experience',
                order: 2,
                component: 'whyOneDollar',
                heading: 'Most charities ask for trust. We believe trust should be documented.',
                description: 'Three core commitments built directly into our platform technology.',
                items: [
                    { title: 'Verified', subtitle: '100% direct tuition settlement to accredited school accounts—never unverified cash.', icon: 'ShieldCheck' },
                    { title: 'Transparent', subtitle: 'Every fee receipt, enrollment form, and audit statement published openly.', icon: 'FileText' },
                    { title: 'Human', subtitle: 'Bi-annual progress updates, report cards, and letters connecting you directly to your sponsored child.', icon: 'HeartHandshake' }
                ]
            }
        },
        {
            sectionKey: 'impactTimeline',
            title: 'Educational Journey Timeline',
            content: '',
            metadata: {
                version: 'v3-trust-experience',
                order: 3,
                component: 'journeyTimeline',
                variant: 'education',
                heading: 'The Educational Journey Flow',
                description: 'From enrollment to graduation, here is how a child\'s growth is documented step-by-step.',
                steps: [
                    { stage: '01', title: 'Enrollment', description: 'Field officers complete household eligibility & school placement assessment.', icon: 'School' },
                    { stage: '02', title: 'Assessment', description: 'Tuition, uniform, and textbook needs calculated directly with the headmaster.', icon: 'Calculator' },
                    { stage: '03', title: 'Learning', description: 'Student receives tailored uniforms, footwear, and full classroom kits.', icon: 'BookOpen' },
                    { stage: '04', title: 'Monthly Reports', description: 'Headmaster registers monthly classroom presence and attendance records.', icon: 'CheckCircle' },
                    { stage: '05', title: 'Progress', description: 'Bi-annual academic transcripts and health check updates uploaded to your portal.', icon: 'TrendingUp' },
                    { stage: '06', title: 'Future', description: 'Secondary school advancement and vocational guidance celebrated.', icon: 'GraduationCap' }
                ]
            }
        },
        {
            sectionKey: 'impactEmotionalBreak',
            title: 'Emotional Visual Interlude',
            content: '',
            metadata: {
                version: 'v3-trust-experience',
                order: 4,
                component: 'editorial',
                layout: 'full-bleed-image',
                heading: 'One child. One classroom. One opportunity.\n\nThat is where every measurable impact begins.',
                image: {
                    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920&auto=format&fit=crop',
                    alt: 'Children in classroom smiling together'
                }
            }
        },
        {
            sectionKey: 'impactStories',
            title: 'Stories Yet To Be Written',
            content: '',
            metadata: {
                version: 'v3-trust-experience',
                order: 5,
                component: 'storyGrid',
                variant: 'stories',
                heading: 'Stories Yet To Be Written',
                description: 'These children will become the first documented educational journeys on our platform.',
                stories: [
                    { id: 's1', slug: 'amara-k', firstName: 'Amara (Format Preview)', dream: 'Primary Teacher Aspirant', summary: 'Sample Report: Tracking attendance recovery, reading comprehension scores, and term-by-term grade progression.', photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop', badgeText: 'First Cohort: Active' },
                    { id: 's2', slug: 'farhan-m', firstName: 'Farhan (Format Preview)', dream: 'STEM & Computer Literacy', summary: 'Sample Report: Monitoring STEM workshop participation, math examination performance, and extracurricular achievements.', photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', badgeText: 'First Cohort: Matched' },
                    { id: 's3', slug: 'tariq-a', firstName: 'Tariq (Format Preview)', dream: 'Secondary School Scholar', summary: 'Sample Report: High school entrance evaluation, national exam preparation, and post-secondary vocational planning.', photoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop', badgeText: 'First Cohort: Alumni' }
                ]
            }
        },
        {
            sectionKey: 'impactMetrics',
            title: 'Transparency by Design',
            content: '',
            metadata: {
                version: 'v3-trust-experience',
                order: 6,
                component: 'metricsGrid',
                variant: 'editorial',
                mode: 'status',
                heading: 'Transparency by Design',
                description: 'Four core commitments built into our technology stack.',
                metrics: [
                    { id: 'm1', label: 'Direct Fee Settlement', value: '100%', sublabel: 'Tuition wire-transferred directly to school accounts' },
                    { id: 'm2', label: 'Audited Partner Schools', value: '12 Schools', sublabel: 'Inspected for safety, accreditation & quality' },
                    { id: 'm3', label: 'Phase 1 Target', value: '500', sublabel: 'Initial launch cohort capacity' },
                    { id: 'm4', label: 'Public Audit Ledger', value: '0$', sublabel: 'Administrative overhead charged from core tuition' }
                ]
            }
        },
        {
            sectionKey: 'impactCTA',
            title: 'Final Impact CTA',
            content: '',
            metadata: {
                version: 'v3-trust-experience',
                order: 7,
                component: 'ctaSection',
                heading: 'Imagine the first story published here.',
                description: 'It begins with someone choosing to believe in a child’s future.',
                ctas: [
                    { label: 'Sponsor a Child ($1/Day)', href: '/sponsor-a-child#meet-children', variant: 'primary' },
                    { label: 'See How Sponsorship Works', href: '/how-it-works', variant: 'secondary' }
                ]
            }
        }
    ]

    for (const section of impactSectionsData) {
        await prisma.homepageSection.upsert({
            where: { sectionKey: section.sectionKey },
            update: section,
            create: section,
        })
    }
    console.log('📄 Our Impact Page Sections seeded')

      // 0.6 Seed FAQs (Categorized & Comprehensive)
    const faqsData = [
        // 1. Getting Started
        { id: 'faq-1', category: 'Getting Started', question: 'Why One Dollar. One Child. One Future.?', answer: 'Our name reflects our core belief: sustainable social impact begins when basic education costs are broken down into an accessible, daily commitment. $1 a day from caring sponsors combines to fund complete, uninterrupted education for children in need.', order: 1 },
        { id: 'faq-2', category: 'Getting Started', question: 'Is $1 charged every day?', answer: 'No. For convenience and to reduce processing fees, contributions are billed either monthly ($30/month) or annually ($365/year), which averages to approximately $1 per day.', order: 2 },
        { id: 'faq-3', category: 'Getting Started', question: 'Why is the monthly option $30 while the annual option is $365?', answer: 'Monthly sponsorship ($30/month) simplifies recurring bank payments into 12 equal monthly installments ($360 total). The annual sponsorship option ($365/year) covers $1 for every single day of a 365-day calendar year in one single gift.', order: 3 },

        // 2. Sponsorship
        { id: 'faq-4', category: 'Sponsorship', question: 'Does $1 a day cover a child’s education?', answer: 'Yes! 100% of your sponsorship is directed toward direct tuition, approved textbooks, uniforms, learning materials, and basic educational support services for the child.', order: 4 },
        { id: 'faq-5', category: 'Sponsorship', question: 'What does sponsorship cover?', answer: 'Sponsorship covers direct school tuition fees, required textbooks, stationery supplies, official school uniforms, exam entry fees, and regular academic progress tracking.', order: 5 },
        { id: 'faq-6', category: 'Sponsorship', question: 'Can I sponsor a child’s complete education?', answer: 'Yes! You can choose to fund a child’s remaining academic journey in full. Because remaining grade costs vary by child, selecting "Complete Education" submits an inquiry to our admin team, who will calculate exact pricing and contact you within 72 hours.', order: 6 },
        { id: 'faq-7', category: 'Sponsorship', question: 'Can I sponsor more than one child?', answer: 'Absolutely. Donors and corporate partners can sponsor multiple children. Each child will have a distinct profile, progress updates, and allocation tracking in your donor dashboard.', order: 7 },

        // 3. Reports & Transparency
        { id: 'faq-8', category: 'Reports & Transparency', question: 'Will I receive receipts for my sponsorship?', answer: 'Yes. Itemized electronic receipts for school fee settlements and sponsorship contributions are issued automatically and stored permanently inside your donor dashboard.', order: 8 },
        { id: 'faq-9', category: 'Reports & Transparency', question: 'Will I receive the child’s report card?', answer: 'Yes. Academic progress reports and attendance updates are shared approximately every six months (subject to local school reporting schedules, student privacy, and safeguarding consent).', order: 9 },
        { id: 'faq-10', category: 'Reports & Transparency', question: 'What can I see inside my donor dashboard?', answer: 'Your donor dashboard displays real-time contribution history, itemized payment receipts, allocated child profiles, milestone updates, and bi-annual academic progress reports.', order: 10 },
        { id: 'faq-11', category: 'Reports & Transparency', question: 'How do you verify children and schools?', answer: 'We conduct independent multi-step verifications. Partner schools undergo accreditation and financial checks, while child needs are verified through local community coordinators.', order: 11 },

        // 4. Child Safety & Privacy
        { id: 'faq-12', category: 'Child Safety', question: 'Can I communicate directly with the child?', answer: 'To protect student safety and dignity, direct unmonitored communication is not permitted. All messaging, updates, and letters are facilitated securely through our monitored platform.', order: 12 },
        { id: 'faq-13', category: 'Child Safety', question: 'Why don’t you show children’s full names or unblurred location data?', answer: 'Strict child safeguarding policies require that we protect children’s privacy. We publish first names and general regional locations only to ensure complete safety.', order: 13 },

        // 5. Schools & Programs
        { id: 'faq-14', category: 'Schools & Programs', question: 'How are children selected for the program?', answer: 'Children are identified by local community educators based on financial vulnerability, school dropout risk, and lack of family support. Needs are verified prior to registry listing.', order: 14 },
        { id: 'faq-15', category: 'Schools & Programs', question: 'Do you work only with private schools?', answer: 'No. We partner with accredited public, community, and low-cost private institutions that meet our academic quality, safety, and financial audit standards.', order: 15 },
        { id: 'faq-16', category: 'Schools & Programs', question: 'What happens if a child changes schools or leaves the program?', answer: 'If a child relocates or exits, your sponsorship seamlessly transitions to another verified child in need, and you receive an immediate update in your dashboard.', order: 16 },

        // 6. Corporate Sponsorship
        { id: 'faq-17', category: 'Corporate Sponsorship', question: 'Can companies sponsor children or cohort programs?', answer: 'Yes! Corporations can sponsor classroom cohorts or entire schools. We provide co-branded impact reports, tax documentation, and CSR verification packages.', order: 17 },
        { id: 'faq-18', category: 'Corporate Sponsorship', question: 'How do corporate partnership allocations work?', answer: 'Corporate sponsors receive dedicated dashboard access to track student retention rates, academic performance metrics, and verified tuition wire receipts.', order: 18 },

        // 7. Legal & Tax
        { id: 'faq-19', category: 'Legal & Tax', question: 'Is the organization registered in Canada?', answer: 'Yes. One Dollar. One Child. One Future. is registered as a non-profit organization in Canada and operates under strict institutional compliance standards.', order: 19 },
        { id: 'faq-20', category: 'Legal & Tax', question: 'Will I receive a Canadian tax receipt?', answer: 'Official charitable tax receipts will be available after CRA charitable registration and receipting eligibility have been formally confirmed. Invoices are issued immediately.', order: 20 },
        { id: 'faq-21', category: 'Legal & Tax', question: 'Can I cancel or modify my monthly sponsorship at any time?', answer: 'Yes. You can pause, modify, or cancel your recurring sponsorship at any time directly through your donor dashboard with no lock-in commitments.', order: 21 },
        { id: 'faq-22', category: 'Legal & Tax', question: 'What payment methods do you accept?', answer: 'We process payments securely via Stripe, accepting all major credit cards (Visa, MasterCard, American Express), Apple Pay, and Google Pay.', order: 22 },
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
        const childId = `child-${index + 1}`
        const childSlug = c.name.toLowerCase()

        await prisma.child.upsert({
            where: { id: childId },
            update: {},
            create: {
                id: childId,
                name: c.name,
                dob: dob,
                gender: c.gender,
                bio: `${c.name} is a bright student from ${c.location}.`,
                story: c.story,
                photoUrl: `/images/impact/child${(index % 6) + 1}.jpg`,
                status: c.status,
                annualCost: 360,
                region: c.location,
                educationLevel: 'Primary',
                schoolId: 'school-1',
                programId: c.programId,
                visibilityScope: 'PUBLIC',
                moderationStatus: 'APPROVED',
            },
        })

        // Also seed into RegistryChild so every child card opens a full narrative profile page with story!
        await prisma.registryChild.upsert({
            where: { slug: childSlug },
            update: {
                displayName: c.name,
                age: c.age,
                region: c.location,
                dream: c.dream,
                shortIntro: `${c.name} is a bright ${c.age}-year-old student from ${c.location} who dreams of becoming a ${c.dream}.`,
                story: `${c.story}\n\n${c.name} walks to school every day with determination. With your support, ${c.name} receives complete tuition, textbooks, uniform, daily meals, and ongoing academic guidance.`,
                status: c.status,
                impactStorySlug: c.name === 'Yusuf' ? 'yusuf-b-business' : undefined,
            },
            create: {
                id: `legacy-reg-${childId}`,
                slug: childSlug,
                displayName: c.name,
                age: c.age,
                region: c.location,
                educationLevel: 'Primary',
                currentGrade: `Grade ${Math.max(1, c.age - 5)}`,
                schoolType: 'Community Primary School',
                progressStage: c.status === ChildStatus.SPONSORED ? 'In Education' : c.status === ChildStatus.GRADUATED ? 'Graduated' : 'Needs Sponsor',
                sponsorshipNeededMonthly: 30,
                status: c.status,
                impactStorySlug: c.name === 'Yusuf' ? 'yusuf-b-business' : undefined,
                safeguardingConsent: true,
                safeguardingReviewStatus: SafeguardingReviewStatus.VERIFIED,
                createdByAdminId: 'admin-1',
                avatarIllustrationUrl: `https://images.unsplash.com/photo-${1544717305 + (index * 1000)}?q=80&w=800&auto=format&fit=crop`,
                dream: `Future ${c.dream}`,
                shortIntro: `${c.name} is a bright ${c.age}-year-old student from ${c.location} who dreams of becoming a ${c.dream}.`,
                story: `${c.story}\n\n${c.name} walks to school every day with determination. With your support, ${c.name} receives complete tuition, textbooks, uniform, daily meals, and ongoing academic guidance.`,
                needs: ['Tuition', 'Textbooks', 'Uniform', 'School Bag', 'Shoes', 'Stationery', 'Learning Materials'],
                aspirations: {
                    favouriteSubject: 'Mathematics & Science',
                    favouriteActivity: 'Reading & Group Learning',
                    dreamCareer: c.dream,
                    goals: `Graduate primary school and pursue higher education as a ${c.dream}`
                },
                sections: [
                    {
                        type: 'story',
                        title: 'Life & Educational Journey',
                        content: `${c.name} shows extraordinary promise in school. Despite financial challenges at home, ${c.name} maintains excellent attendance and helps classmates.`
                    },
                    {
                        type: 'quote',
                        title: 'Teacher\'s Perspective',
                        content: `${c.name} brings joy and curiosity to our classroom every day.`,
                        author: 'Head Teacher, Community Primary'
                    }
                ],
                transformationBeforeAfter: {
                    before: [
                        'Irregular attendance due to fee constraints',
                        'Lack of basic learning supplies'
                    ],
                    today: [
                        'Full classroom attendance & active participation',
                        'Fully equipped with learning materials and uniform'
                    ]
                }
            }
        })
    }
    console.log('👶 Legacy & Registry Children seeded with full narrative profiles')

    // 6. Seed RegistryChild records for Mission-Driven Sponsorship & Profile Pages
    const registryChildren = [
        {
            id: 'reg-child-1',
            slug: 'amara-k',
            displayName: 'Amara K.',
            age: 8,
            region: 'Eastern Province',
            educationLevel: 'Primary',
            currentGrade: 'Grade 3',
            schoolType: 'Hope Community Primary',
            progressStage: 'Needs Sponsor',
            sponsorshipNeededMonthly: 30,
            status: ChildStatus.WAITING,
            safeguardingConsent: true,
            safeguardingReviewStatus: SafeguardingReviewStatus.VERIFIED,
            createdByAdminId: 'admin-1',
            avatarIllustrationUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
            dream: 'I want to become a teacher.',
            shortIntro: 'Amara is a bright 8-year-old student who loves reading and dreams of building a community school.',
            story: 'Amara lives with her grandmother in a small village. Despite daily challenges, she is the first to arrive at school every morning with enthusiasm.',
            needs: ['Tuition', 'Textbooks', 'Uniform', 'School Bag', 'Shoes', 'Stationery', 'Learning Materials'],
            aspirations: {
                favouriteSubject: 'Mathematics & English',
                favouriteActivity: 'Reading & Group Games',
                dreamCareer: 'Primary School Teacher',
                goals: 'Build a community library for local children'
            },
            sections: [
                {
                    type: 'story',
                    title: 'Early Life & Hopes',
                    content: 'Amara\'s family faces severe economic hardship, but her determination to learn has never wavered. She assists her younger siblings with homework every evening.'
                },
                {
                    type: 'quote',
                    title: 'Teacher\'s Note',
                    content: 'Amara brings joy to our classroom every day. She helps her classmates read and excels at problem-solving.',
                    author: 'Mrs. Nangolo, Head Teacher'
                }
            ],
            transformationBeforeAfter: {
                before: [
                    'Irregular attendance due to uniform & fee constraints',
                    'Lack of basic textbooks and stationery',
                    'Risk of early school drop-out'
                ],
                today: [
                    'Full attendance & active classroom participation',
                    'Fully equipped with learning materials and uniform',
                    'Excelling at grade-level reading tests'
                ]
            }
        },
        {
            id: 'reg-child-2',
            slug: 'farhan-m',
            displayName: 'Farhan M.',
            age: 10,
            region: 'Northern Valley',
            educationLevel: 'Primary',
            currentGrade: 'Grade 5',
            schoolType: 'Valley Horizon Academy',
            progressStage: 'Matched with Sponsor',
            sponsorshipNeededMonthly: 30,
            status: ChildStatus.SPONSORED,
            safeguardingConsent: true,
            safeguardingReviewStatus: SafeguardingReviewStatus.VERIFIED,
            createdByAdminId: 'admin-1',
            avatarIllustrationUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
            dream: 'Future Computer Engineer',
            shortIntro: 'Farhan loves building models from recycled materials and dreams of designing technology for his community.',
            story: 'Farhan is a creative 10-year-old who excels in science. Sponsorship ensures he receives steady access to computer literacy classes.',
            needs: ['Tuition', 'Textbooks', 'Uniform', 'Digital Learning Tools', 'Stationery'],
            aspirations: {
                favouriteSubject: 'Science & Computer Studies',
                favouriteActivity: 'Model Building & Coding',
                dreamCareer: 'Software Engineer',
                goals: 'Create educational tools for rural schools'
            },
            sections: [
                {
                    type: 'story',
                    title: 'A Passion for Technology',
                    content: 'Farhan spends his free time constructing wind-mill models using scrap wood. His teachers describe him as an inventive problem solver.'
                }
            ],
            transformationBeforeAfter: {
                before: [
                    'No access to digital tools or science labs',
                    'Struggled to secure annual school supplies'
                ],
                today: [
                    'Enrolled in computer literacy workshops',
                    'Top scoring student in regional science project'
                ]
            }
        },
        {
            id: 'reg-child-3',
            slug: 'zainab-s',
            displayName: 'Zainab S.',
            age: 9,
            region: 'Central Highlands',
            educationLevel: 'Primary',
            currentGrade: 'Grade 4',
            schoolType: 'Highland Community School',
            progressStage: 'Year 2 of Education',
            sponsorshipNeededMonthly: 30,
            status: ChildStatus.SPONSORED,
            safeguardingConsent: true,
            safeguardingReviewStatus: SafeguardingReviewStatus.VERIFIED,
            createdByAdminId: 'admin-1',
            avatarIllustrationUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
            dream: 'I want to fly airplanes as a commercial pilot.',
            shortIntro: 'Zainab is a bold, inquisitive student fascinated by aviation and geography.',
            story: 'Sponsored in 2024, Zainab has maintained a top academic record and is thriving in her second year of primary school.',
            needs: ['Tuition', 'Textbooks', 'Uniform', 'School Bag', 'Stationery'],
            aspirations: {
                favouriteSubject: 'Geography & Science',
                favouriteActivity: 'Drawing Maps & Flying Kites',
                dreamCareer: 'Commercial Airline Pilot',
                goals: 'Travel the world and support girls\' education'
            },
            sections: [
                {
                    type: 'story',
                    title: 'Reaching for the Skies',
                    content: 'Zainab keeps a diary of sky maps. Her confidence has grown immensely since starting her sponsored education.'
                }
            ],
            transformationBeforeAfter: {
                before: [
                    'Uncertain enrollment semester to semester',
                    'Limited access to books'
                ],
                today: [
                    'Stable multi-year educational sponsorship',
                    'Classroom leader in geography and reading'
                ]
            }
        },
        {
            id: 'reg-child-4',
            slug: 'tariq-a',
            displayName: 'Tariq A.',
            age: 19,
            region: 'Southern District',
            educationLevel: 'High School Graduate',
            currentGrade: 'Graduated',
            schoolType: 'St. Jude High School',
            progressStage: 'Enrolled in University',
            sponsorshipNeededMonthly: 30,
            status: ChildStatus.GRADUATED,
            safeguardingConsent: true,
            safeguardingReviewStatus: SafeguardingReviewStatus.VERIFIED,
            createdByAdminId: 'admin-1',
            avatarIllustrationUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
            dream: 'Environmental Scientist',
            shortIntro: 'Tariq successfully completed 6 years of sponsored education and is now studying Environmental Science at University.',
            story: 'Tariq\'s journey from a struggling primary student to university honors is a testament to what belief and opportunity can achieve.',
            impactStorySlug: 'tariq-a-graduation',
            needs: ['University Supplies', 'Laptop', 'Research Grants'],
            aspirations: {
                favouriteSubject: 'Chemistry & Biology',
                favouriteActivity: 'Plant Conservation & Youth Mentoring',
                dreamCareer: 'Environmental Researcher',
                goals: 'Develop water purification systems for rural villages'
            },
            sections: [
                {
                    type: 'story',
                    title: 'A Life Transformed',
                    content: 'Tariq entered the sponsorship program in 2018. Over six years, he maintained an A-average and passed his university entry exams with distinction.'
                }
            ],
            transformationBeforeAfter: {
                before: [
                    'Severe financial risk of dropping out at Grade 7',
                    'No family resources for high school fees'
                ],
                today: [
                    'High school graduate with honors',
                    'University student in B.Sc. Environmental Science'
                ]
            }
        },
        {
            id: 'reg-child-5',
            slug: 'fatima-r',
            displayName: 'Fatima R.',
            age: 7,
            region: 'Eastern Province',
            educationLevel: 'Primary',
            currentGrade: 'Grade 2',
            schoolType: 'Hope Primary',
            progressStage: 'Needs Sponsor',
            sponsorshipNeededMonthly: 30,
            status: ChildStatus.WAITING,
            safeguardingConsent: true,
            safeguardingReviewStatus: SafeguardingReviewStatus.VERIFIED,
            createdByAdminId: 'admin-1',
            avatarIllustrationUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
            dream: 'I want to be a Pediatric Nurse.',
            shortIntro: 'Fatima is a gentle 7-year-old who loves caring for animals and helping her classmates.',
            story: 'Fatima is eager to attend school consistently. With sponsorship, she can secure tuition, textbooks, and daily nutritious meals.',
            needs: ['Tuition', 'Textbooks', 'Uniform', 'School Bag', 'Stationery'],
            aspirations: {
                favouriteSubject: 'Health Science & Art',
                favouriteActivity: 'Drawing & Storytelling',
                dreamCareer: 'Pediatric Nurse',
                goals: 'Provide healthcare for children in remote areas'
            },
            transformationBeforeAfter: {
                before: [
                    'Missing school due to fee shortages',
                    'No access to proper school uniform'
                ],
                today: [
                    'Enrolled and awaiting matching sponsor',
                    'Receiving community support'
                ]
            }
        },
        {
            id: 'reg-child-6',
            slug: 'omar-k',
            displayName: 'Omar K.',
            age: 11,
            region: 'Western Coast',
            educationLevel: 'Primary',
            currentGrade: 'Grade 6',
            schoolType: 'Coastal Academy',
            progressStage: 'Needs Sponsor',
            sponsorshipNeededMonthly: 30,
            status: ChildStatus.WAITING,
            safeguardingConsent: true,
            safeguardingReviewStatus: SafeguardingReviewStatus.VERIFIED,
            createdByAdminId: 'admin-1',
            avatarIllustrationUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
            dream: 'Future Civil Engineer',
            shortIntro: 'Omar is passionate about math and dreams of building sturdy bridges for his coastal village.',
            story: 'Omar demonstrates natural mathematical aptitude. Sponsorship will help him finish primary school and transition to secondary education.',
            needs: ['Tuition', 'Textbooks', 'Uniform', 'School Bag', 'Stationery', 'Shoes'],
            aspirations: {
                favouriteSubject: 'Mathematics & Physics',
                favouriteActivity: 'Building Blocks & Swimming',
                dreamCareer: 'Civil Engineer',
                goals: 'Design infrastructure resilient to coastal weather'
            },
            transformationBeforeAfter: {
                before: [
                    'Risk of early entry into informal labor',
                    'Lack of advanced math learning books'
                ],
                today: [
                    'Active in STEM club, awaiting sponsor',
                    'Grade 6 top math student'
                ]
            }
        }
    ]

    for (const rc of registryChildren) {
        await prisma.registryChild.upsert({
            where: { slug: rc.slug },
            update: rc,
            create: rc,
        })
    }
    console.log('👶 Registry Children seeded with rich profile data')

    // 7. Seed Impact Stories for Graduated Alumni
    const impactStories = [
        {
            id: 'tariq-a-graduation',
            title: 'Tariq’s Journey: From Rural Primary Student to Environmental Scientist',
            content: `When Tariq joined our sponsorship program in 2018 at age 12, his family in the Southern District was facing severe financial hardship. High school fees were far beyond their reach, and Tariq was at high risk of leaving school at Grade 7.

Through the monthly $30 sponsorship program, Tariq received direct tuition settlement, textbooks, laboratory equipment, and dedicated mentoring from his school headmaster.

Over the next six years, Tariq consistently ranked at the top of his class in Chemistry and Biology. In 2024, he passed his national university entrance exams with distinction and was accepted into a Bachelor of Science program in Environmental Science.

Today, Tariq mentors younger students in his village and is working on a youth-led initiative to build low-cost water filtration systems for rural communities.

"Without sponsorship, my educational journey would have ended six years ago. Today, I am studying to solve environmental challenges for my entire region." — Tariq A.`,
            imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
            status: StoryStatus.PUBLISHED,
            publishAt: new Date('2025-01-15'),
            guardianConsent: true,
        },
        {
            id: 'yusuf-b-business',
            title: 'Yusuf’s Journey: Vocational Excellence & Local Entrepreneurship',
            content: `Yusuf grew up in Dadu, where access to secondary school and vocational training was severely limited. Enrolled into the sponsorship registry at age 12, Yusuf received complete tuition support, uniforms, and specialized mathematics tutoring.

After graduating secondary school with honors, Yusuf completed a 2-year vocational diploma in Business Administration and Commerce.

Today, Yusuf runs a thriving local solar equipment supply store in Dadu, employing three young apprentices from his community.

"Education gave me both the skills and confidence to build a real business. Now I am able to give back to the next generation." — Yusuf B.`,
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
            status: StoryStatus.PUBLISHED,
            publishAt: new Date('2025-02-01'),
            guardianConsent: true,
        }
    ]

    for (const story of impactStories) {
        await prisma.impactStory.upsert({
            where: { id: story.id },
            update: story,
            create: story,
        })
    }
    console.log('📖 Impact Stories seeded for Graduated Alumni')

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
