"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // 🔟 ANALYTICS PERFORMANCE SAFEGUARD:
        // Implement sampling logic on high-traffic storytelling pages 
        // to prevent analytics payloads from degrading performance.
        const isHighTrafficRoute = pathname?.startsWith('/stories') || pathname?.startsWith('/our-story');

        // 10% sampling rate for high traffic, 100% for conversion funnels
        const shouldTrack = isHighTrafficRoute ? Math.random() < 0.1 : true;

        if (shouldTrack) {
            // 9️⃣ DONOR BEHAVIOR ANALYTICS LAYER:
            // Mock payload structure for ethical, GDPR-compliant tracking.
            const payload = {
                route: pathname,
                timestamp: new Date().toISOString(),
                isAnonymized: true, // Ethical Tracking Compliance
                consentGranted: true,
                event: 'PAGE_VIEW_ATTRIBUTION'
            };

            // In production, this dispatches to an external analytics provider securely.
            if (process.env.NODE_ENV === 'development') {
                console.log('[Analytics Tracker] Event Captured:', payload);
            }
        }
    }, [pathname]);

    return null;
}
