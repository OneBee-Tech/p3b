/**
 * PHASE 11: TIMEZONE-AWARE SCHEDULING
 * 
 * Known Limitation:
 * Current timezone-based dispatch uses in-memory delay logic.
 * Delayed jobs will not survive server restarts. Suitable for moderate traffic only.
 * Future Enhancement (Phase 12): Migrate to Redis-backed delayed job queue (e.g., BullMQ)
 * to persist scheduled events safely across restarts.
 */
export function calculateDispatchDelay(timezone: string | null): number {
    if (!timezone) return 0; // Immediate if no timezone set

    try {
        // Get the current hour in the target timezone
        const options: Intl.DateTimeFormatOptions = {
            timeZone: timezone,
            hour: 'numeric',
            hour12: false,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const hourString = formatter.format(new Date());

        // Handle variations where '24' might be returned for midnight
        let currentHour = parseInt(hourString, 10);
        if (currentHour === 24) currentHour = 0;

        // 8 AM to 6 PM is the valid window (8 to 17 inclusively)
        if (currentHour >= 8 && currentHour < 18) {
            return 0; // Immediate dispatch
        }

        // Calculate hours until 8 AM next day
        let hoursToWait = 0;
        if (currentHour < 8) {
            hoursToWait = 8 - currentHour;
        } else {
            hoursToWait = (24 - currentHour) + 8;
        }

        // Return delay in milliseconds
        return hoursToWait * 60 * 60 * 1000;

    } catch (error) {
        console.warn(`[TIMEZONE_DISPATCHER] Invalid timezone '${timezone}'. Defaulting to immediate dispatch.`);
        return 0;
    }
}
