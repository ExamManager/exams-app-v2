import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import  generateOTP  from "@/lib/validations/otp"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { EmailTemplate as EmailTemplateNewUser } from '../components/emails/newuser';
import { EmailTemplate as EmailTemplateSignIn } from '../components/emails/signin';
import { Resend } from 'resend';

import PostHogClient from "../app/posthog.js"
const posthog = PostHogClient()

const resend = new Resend(env.RESEND_API_KEY || "re_missing_at_build");


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  // Portfolio/demo fallback so marketing pages render without full secrets.
  secret:
    env.NEXTAUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "exams-app-v2-portfolio-demo-secret",
  pages: {
    signIn: "/login",
    newUser: "/account/register",
  },
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID || "portfolio-demo-github-client-id",
      clientSecret: env.GITHUB_CLIENT_SECRET || "portfolio-demo-github-client-secret",
    }),
    EmailProvider({
      maxAge: 5 * 60,
      generateVerificationToken: async () => {
        // generate string of 6 numbers
        const token = generateOTP();
        return token;
      },
      sendVerificationRequest: async ({ identifier, url, token }) => {
        try {
          const user = await db.user.findUnique({
            where: {
              email: identifier,
            },
            select: {
              emailVerified: true,
            },
          })

          const newUser = !user?.emailVerified;

          const data = await resend.emails.send({
            from: 'ExamManager <support@examtimer.tech>',
            to: identifier,
            subject: user?.emailVerified ? 'Sign in to ExamManager' + token : 'Welcome to ExamManager',
            react: user?.emailVerified ? EmailTemplateSignIn({ otp: token }) : EmailTemplateNewUser({ action_url: url }),
            text: user?.emailVerified ? `Sign in to ExamManager using this OTP: ${token}` : `Welcome to ExamManager. Click the link to verify your email: ${url}`,
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
      console.log("JWT Callback")
      console.log(token)
      console.log(user)
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
    async signIn({ user, account, profile, email, credentials, intent }) {
      posthog.capture({
        distinctId: user?.email || user.id,
        event: 'User Signed In',
        properties: {
          $set: {
            name: user.name,
            email: user.email,
            provider: account?.provider,
          }
        }
      })
      if (user.email) {
        posthog.alias({
          distinctId: user.email,
          alias: user.id,
        })
      }
      // Check if user is new and 
      if (account?.provider === 'email' && user?.email) {
        const newUser = await db.user.findUnique({
          where: {
            email: user.email,
          },
          select: {
            emailVerified: true,
          },
        })
        if (!newUser?.emailVerified) {
          console.log('New User')
          return false
        } else {
          console.log('Existing User')
          return Promise.resolve(true)
        }
      }

      return true 
    },
  },
}
