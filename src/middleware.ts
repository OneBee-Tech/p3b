import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

// Next.js Middleware to protect specific routes using the edge-compatible config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');

    if (isDashboardRoute && !isLoggedIn) {
        // Redirect unauthenticated users to the login page
        return NextResponse.redirect(new URL('/api/auth/signin?callbackUrl=/dashboard', nextUrl));
    }

    return NextResponse.next();
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
