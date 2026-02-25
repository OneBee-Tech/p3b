import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

// Next.js Middleware to protect specific routes using the edge-compatible config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const role = (req.auth?.user as any)?.role;
    const { nextUrl } = req;
    const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');
    const isHomePage = nextUrl.pathname === '/';
    const isSignInPage = nextUrl.pathname.startsWith('/signin') || nextUrl.pathname.startsWith('/api/auth/signin');

    // Admin auto-redirect: if an ADMIN lands on home, signin, or dashboard — send to /admin
    if (isLoggedIn && role === 'ADMIN' && !nextUrl.pathname.startsWith('/admin') && !isSignInPage) {
        if (isHomePage || isDashboardRoute) {
            return NextResponse.redirect(new URL('/admin', nextUrl));
        }
    }

    // Protect donor dashboard from unauthenticated access
    if (isDashboardRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/api/auth/signin?callbackUrl=/dashboard', nextUrl));
    }

    return NextResponse.next();
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
