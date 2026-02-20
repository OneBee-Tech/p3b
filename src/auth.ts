import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"

class CustomError extends CredentialsSignin {
    code = "custom_error"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Demo Login',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "donor@example.com" },
                password: { label: "Password (any)", type: "password" }
            },
            async authorize(credentials) {
                // If the user just clicks "Sign in" without typing, the form submits an empty string.
                // We fallback to the demo email.
                const email = credentials?.email || "donor@example.com";

                console.log("Authorize called with email:", email);

                try {
                    const user = await prisma.user.upsert({
                        where: { email: email as string },
                        update: {},
                        create: {
                            email: email as string,
                            name: "Alex Donor",
                            role: "USER"
                        }
                    });

                    console.log("Successfully retrieved user from DB:", user.id);
                    // Return a strictly typed user object for NextAuth
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    };
                } catch (e: any) {
                    console.error("Failed to upsert user:", e);
                    throw new CustomError("Database error during login");
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.sub = user.id;
            }
            return token;
        }
    }
})
