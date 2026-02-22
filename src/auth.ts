import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

function html(params: { url: string, host: string }) {
    const { url } = params
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px 10px; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        <h1 style="color: #1a202c; font-size: 24px; margin-bottom: 20px;">Secure Sign-In</h1>
        <p style="color: #4a5568; font-size: 16px; margin-bottom: 30px;">
          Click the button below to securely access your OneDollarOneChild Donor Dashboard.
        </p>
        <a href="${url}" style="background-color: #d4af37; color: #1a202c; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block; margin-bottom: 30px;">
          Access Your Donor Dashboard
        </a>
        <p style="color: #718096; font-size: 14px; margin-bottom: 30px;">
          This link expires in 15 minutes and can only be used once.<br/>
          If you did not request this email, you can safely ignore it.
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="color: #a0aec0; font-size: 12px;">
          <strong>OneDollarOneChild</strong><br/>
          Registered NGO &bull; Secure Donations &bull; Child Safeguarding<br/>
          Need help? Contact <a href="mailto:support@onedollaronechild.org" style="color: #2b6cb0;">support@onedollaronechild.org</a>
        </p>
      </div>
    </div>
  `
}

function text({ url, host }: { url: string, host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            async sendVerificationRequest(params) {
                const { identifier, url, provider } = params
                const { host } = new URL(url)
                const { createTransport } = await import("nodemailer")
                const transport = createTransport(provider.server)
                const result = await transport.sendMail({
                    to: identifier,
                    from: provider.from,
                    subject: `Your Secure Sign-In Link | OneDollarOneChild`,
                    text: text({ url, host }),
                    html: html({ url, host }),
                })
                const failed = result.rejected.concat(result.pending).filter(Boolean)
                if (failed.length) {
                    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
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
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = (user as any).role || "USER";
                token.sub = user.id;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session }
            }
            return token;
        }
    }
})
