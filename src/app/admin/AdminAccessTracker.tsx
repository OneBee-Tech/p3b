"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logAdminAccess } from "./actions";

export function AdminAccessTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            logAdminAccess(pathname);
        }
    }, [pathname]);

    return null;
}
