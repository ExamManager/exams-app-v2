import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { EmailTemplate } from '../components/emails/test';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        try {
          const user = await db.user.findUnique({
            where: {
              email: identifier,
            },
            select: {
              emailVerified: true,
            },
          })

          const data = await resend.emails.send({
            from: 'ExamManager <support@examdashboard.tech>',
            to: identifier,
            subject: 'Activate Account',
            react: EmailTemplate({ action_url: url }),
            text: 'Actiavte your account here: ' + url
          });

          if (data.error) {
            // If data.error is an object, stringify it
            throw new Error(JSON.stringify(data.error))
          }
        } catch (error) {
          console.error('An error occurred:', error);
          // Handle the error appropriately here
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
