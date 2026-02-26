import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Clock, MapPin, BookOpen, DollarSign } from "lucide-react";

// Matches the Prisma RegistryChild shape
interface RegistryChildCardData {
    id: string;
    displayName: string;
    age: number;
    region: string;
    educationLevel: string;
    sponsorshipNeededMonthly: number | string | { toNumber: () => number };
    story?: string | null;
    avatarIllustrationUrl: string | null;
    status: string;
    safeguardingReviewStatus: string;
    privacyMode: string;
}

interface SponsorshipCardProps {
    child: RegistryChildCardData;
}

export function SponsorshipCard({ child }: SponsorshipCardProps) {
    const monthlyAmount = typeof child.sponsorshipNeededMonthly === "object" && "toNumber" in child.sponsorshipNeededMonthly
        ? child.sponsorshipNeededMonthly.toNumber()
        : Number(child.sponsorshipNeededMonthly);

    const isUrgent = child.safeguardingReviewStatus === "VERIFIED";

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f4f8]">
                {child.avatarIllustrationUrl ? (
                    <img
                        src={child.avatarIllustrationUrl}
                        alt={child.displayName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <img
                        src={`https://api.dicebear.com/9.x/micah/svg?seed=${child.id}&backgroundColor=ffd5dc,b6e3f4,c0aede,d1d4f9`}
                        alt={child.displayName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Verified / Ready Tag */}
                {isUrgent && (
                    <div className="absolute top-4 left-4 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm">
                        <Heart className="w-3 h-3" />
                        <span>Ready for Sponsor</span>
                    </div>
                )}

                {/* Privacy badge */}
                {child.privacyMode === "SPONSOR_ONLY" && (
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                        Protected Identity
                    </div>
                )}

                {/* Quick Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-heading font-bold mb-1">{child.displayName}, {child.age}</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-white/90">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {child.region}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-trust-blue font-bold text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>{child.educationLevel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                        <DollarSign className="w-4 h-4" />
                        <span>${monthlyAmount.toFixed(0)}/month sponsorship needed</span>
                    </div>
                </div>

                {child.story && (
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4 flex-grow">
                        {child.story}
                    </p>
                )}

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link href={`/programs/${child.id}`} className="block w-full">
                        <Button variant="impact" className="w-full shadow-md font-bold text-base py-6 hover:-translate-y-1 transition-transform hover:cursor-pointer">
                            Sponsor {child.displayName}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
