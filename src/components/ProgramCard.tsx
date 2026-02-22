import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Clock, MapPin, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Child {
    id: string;
    name: string;
    age: number;
    gender: string;
    location: string;
    dream: string;
    image: string;
    bio: string;
    isUrgent?: boolean;
}

interface SponsorshipCardProps {
    child: Child;
}

export function SponsorshipCard({ child }: SponsorshipCardProps) {
    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f4f8]">
                <img
                    src={`https://api.dicebear.com/9.x/micah/svg?seed=${child.name}&backgroundColor=ffd5dc,b6e3f4,c0aede,d1d4f9`}
                    alt={child.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Urgency Tag */}
                {child.isUrgent && (
                    <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm animate-pulse-slow">
                        <Clock className="w-3 h-3" />
                        <span>Waiting 200+ Days</span>
                    </div>
                )}

                {/* Wishlist/Like Button */}
                <button className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors hover:scale-110 transform">
                    <Heart className="w-6 h-6" />
                </button>

                {/* Quick Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-heading font-bold mb-1">{child.name}, {child.age}</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-white/90">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {child.location}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Dreams of being a</p>
                    <div className="flex items-center gap-2 text-trust-blue font-bold">
                        <GraduationCap className="w-4 h-4" />
                        <span>{child.dream}</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed mb-6 flex-grow">
                    {child.bio}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link href={`/programs/${child.id}`} className="block w-full">
                        <Button variant="impact" className="w-full shadow-md font-bold text-base py-6 hover:-translate-y-1 transition-transform hover:cursor-pointer">
                            Sponsor {child.name}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
