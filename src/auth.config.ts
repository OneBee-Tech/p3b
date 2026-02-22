import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/signin',
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnCheckout = nextUrl.pathname.startsWith('/checkout');

            if (isOnDashboard || isOnAdmin || isOnCheckout) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
    },
    session: { strategy: "jwt" },
} satisfies NextAuthConfig
