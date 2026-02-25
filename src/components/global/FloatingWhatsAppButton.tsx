import { MessageCircle } from "lucide-react";

export function FloatingWhatsAppButton() {
    return (
        <a
            href="https://wa.me/XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 left-4 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 group md:bottom-6 md:left-6"
            aria-label="Chat with us on WhatsApp"
        >
            <MessageCircle className="w-7 h-7" />

            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-3 py-1.5 bg-cinematic-dark text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                Chat with us
                <span className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-4 border-transparent border-r-cinematic-dark" />
            </span>
        </a>
    );
}
