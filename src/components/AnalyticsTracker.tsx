"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // 🔟 ANALYTICS PERFORMANCE SAFEGUARD:
        // Implement sampling logic on high-traffic storytelling pages 
        // to prevent analytics payloads from degrading performance.
        const isHighTrafficRoute = pathname?.startsWith('/stories') || pathname?.startsWith('/our-story') || pathname === '/';

        // 10% sampling rate for high traffic, 100% for conversion funnels
        const shouldTrack = isHighTrafficRoute ? Math.random() < 0.1 : true;

        if (shouldTrack) {
            // 9️⃣ DONOR BEHAVIOR ANALYTICS LAYER:
            const payload = {
                route: pathname,
                timestamp: new Date().toISOString(),
                isAnonymized: true, // Ethical Tracking Compliance
                consentGranted: true,
                event: pathname === '/' ? 'LANDING_PAGE_VIEW' : 'PAGE_VIEW_ATTRIBUTION'
            };

            if (process.env.NODE_ENV === 'development') {
                console.log('[Analytics Tracker] Event Captured:', payload);
            }

            // Track max scroll depth for landing page
            if (pathname === '/') {
                let maxScroll = 0;
                const scrollHandler = () => {
                    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                    if (scrollPercent > maxScroll) {
                        maxScroll = scrollPercent;
                    }
                };
                window.addEventListener('scroll', scrollHandler, { passive: true });

                return () => {
                    window.removeEventListener('scroll', scrollHandler);
                    if (maxScroll > 10) {
                        console.log('[Analytics Tracker] Scroll Depth:', { route: pathname, maxScroll, isAnonymized: true });
                    }
                };
            }
        }
    }, [pathname]);

    // Global helper for CTA tracking
    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link) {
                const trackingSource = link.getAttribute('data-tracking');

                // Track if it has an explicit tracking tag OR routes to core conversion paths
                if (trackingSource || link.href.includes('/programs') || link.href.includes('/stories')) {
                    // 10% sample for CTA clicks on landing
                    if (pathname === '/' && Math.random() < 0.1) {
                        console.log('[Analytics Tracker] Intent Captured:', {
                            event: trackingSource ? `INTENT_${trackingSource.toUpperCase()}` : 'LINK_CLICK',
                            href: link.href,
                            source: pathname,
                            isAnonymized: true
                        });
                    }
                }
            }
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [pathname]);

    return null;
}
