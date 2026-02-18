import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [], // Add providers here (Google, Email, etc.)
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as "ADMIN" | "USER" | "FIELD_PARTNER" | "FINANCE";
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await db.user.findUnique({
                where: { id: token.sub },
            });

            if (!user) return token;

            token.role = user.role;
            return token;
        }
    },
})
