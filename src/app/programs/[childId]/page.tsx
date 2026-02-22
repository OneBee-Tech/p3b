import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, GraduationCap, ShieldCheck } from "lucide-react";

// Mock Data - In a real app, this would be fetched from the database using `childId`
const children = [
    {
        id: "1", name: "Ayesha", age: 8, gender: "Female", location: "Sindh, PK", dream: "Doctor", image: "/images/impact/child1.jpg", isUrgent: true,
        bio: "Ayesha loves science but her local school lacks basic supplies. Your $30/mo sponsorship will directly fund her tuition, daily nutritional meals, and the textbooks she needs to chase her dream of becoming a pediatrician.",
        story: "Ayesha was born in a small village where access to comprehensive education is incredibly limited. Despite the daily three-mile walk to the nearest provisional learning center, she has maintained top marks in her science and mathematics classes. \n\nHer family relies entirely on seasonal agricultural work, making it impossible to afford the rising costs of uniforms, textbooks, and examination fees. When you sponsor Ayesha, you are doing more than just paying for school—you are securing her place in the classroom, providing daily fortified meals to ensure she can focus, and lifting the financial burden off her family so she isn't pressured to drop out and work. \n\nAyesha wants to become a doctor so she can return to her village and open a clinic. Your support today is the foundation of that clinic tomorrow."
    },
    {
        id: "2", name: "Raju", age: 10, gender: "Male", location: "Punjab, PK", dream: "Engineer", image: "/images/impact/child2.jpg",
        bio: "Raju is a math prodigy who had to drop out to help his family. Sponsorship will cover his re-enrollment fees and provide a monthly stipend to his household so he can return to class.",
        story: "Raju is a brilliant young student..."
    },
    {
        id: "3", name: "Fatima", age: 6, gender: "Female", location: "KPK, PK", dream: "Teacher", image: "/images/impact/child3.jpg", isUrgent: true,
        bio: "Fatima walks 3 miles a day to reach the nearest charity school. Your support provides safe transportation and uniform costs, ensuring she stays enrolled safely.",
        story: "Fatima dreams of teaching..."
    },
    {
        id: "4", name: "Ali", age: 12, gender: "Male", location: "Balochistan, PK", dream: "Pilot", image: "/images/impact/child4.jpg",
        bio: "Ali dreams of flying but currently works in a local market. Sponsoring him ensures his family receives income replacement, allowing Ali to focus entirely on his foundational education.",
        story: "Ali has always wanted to fly..."
    },
    {
        id: "5", name: "Zainab", age: 9, gender: "Female", location: "Sindh, PK", dream: "Artist", image: "/images/impact/child5.jpg",
        bio: "Zainab expresses herself through drawing but has never owned a sketchbook. Your funds will guarantee her school placement and provide essential creative and academic supplies.",
        story: "Zainab is a talented artist..."
    },
    {
        id: "6", name: "Bilal", age: 11, gender: "Male", location: "Punjab, PK", dream: "Cricketer", image: "/images/impact/child6.jpg",
        bio: "Bilal leverages sports to stay focused. Sponsorship covers his core curriculum costs and provides access to the school's newly funded physical education program.",
        story: "Bilal loves cricket..."
    },
];

export default async function ChildSponsorPage({ params }: { params: Promise<{ childId: string }> }) {
    const { childId } = await params;

    const child = children.find(c => c.id === childId) || children[0]; // Fallback to Ayesha if not found

    return (
        <main className="min-h-screen bg-warm-bg pb-20">
            {/* Header */}
            <div className="bg-cinematic-dark text-white pt-32 pb-12 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-trust-blue/20 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/programs" className="text-white/60 hover:text-white transition-colors text-sm font-medium mb-6 inline-block">
                        &larr; Back to all children
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Sponsor {child.name}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/80">
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-trust-blue" /> {child.location}</span>
                        <span className="flex items-center gap-2">&bull; {child.age} Years Old</span>
                        <span className="flex items-center gap-2 text-impact-gold"><GraduationCap className="w-4 h-4" /> Dreams of being a {child.dream}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Story */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold font-heading text-cinematic-dark mb-6">About {child.name}</h2>
                            <div className="prose prose-lg text-gray-600 prose-p:leading-relaxed">
                                {child.story.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        <div className="bg-warm-ivory p-8 rounded-2xl border border-impact-gold/30">
                            <h3 className="font-bold text-impact-gold mb-3 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" /> How Your Sponsorship Works
                            </h3>
                            <p className="text-cinematic-dark text-sm leading-relaxed mb-4">
                                100% of your $30 monthly contribution is structurally allocated to {child.name}'s ecosystem. Private donors cover our operational overhead, ensuring your funds are deployed exclusively for tuition, preventative health, and localized family support.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-700 font-medium">
                                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-trust-blue before:rounded-full">Guaranteed school enrollment and unbroken tuition coverage</li>
                                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-trust-blue before:rounded-full">Provision of all required textbooks, uniforms, and scholastic materials</li>
                                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-trust-blue before:rounded-full">Access to the school's nutritional feeding program</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Avatar & CTA */}
                    <div className="lg:col-span-5 sticky top-24">
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            {/* Avatar Presentation */}
                            <div className="relative aspect-square bg-[#eceff4] p-8 flex items-center justify-center">
                                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md rounded px-3 py-1.5 text-[10px] font-bold text-gray-600 uppercase tracking-wider shadow-sm z-10 border border-gray-200">
                                    Symbolic Representation
                                </div>
                                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm z-10">
                                    <Heart className="w-5 h-5" />
                                </button>

                                <img
                                    src={`https://api.dicebear.com/9.x/micah/svg?seed=${child.name}&backgroundColor=transparent`}
                                    alt={child.name}
                                    className="w-full h-full max-w-[80%] max-h-[80%] object-contain"
                                />
                            </div>

                            {/* Sponsorship Actions */}
                            <div className="p-8 bg-white">
                                <Link href={`/checkout?type=sponsorship&programId=prog-1&childId=${child.id}`} className="block w-full">
                                    <Button variant="impact" size="lg" className="w-full font-bold text-lg py-6 shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                                        Sponsor {child.name} Now
                                    </Button>
                                </Link>

                                <p className="text-xs text-center text-gray-400 mt-6 font-medium">
                                    By sponsoring {child.name}, you’ll receive quarterly updates and verifiable impact reports detailing exactly how your funds are utilized.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
