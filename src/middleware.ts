import NextAuth from "next-auth"
import { auth } from "./auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")

    if (isOnDashboard || isOnAdmin) {
        if (isLoggedIn) return
        return Response.redirect(new URL("/api/auth/signin", req.nextUrl))
    }
})

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
}
