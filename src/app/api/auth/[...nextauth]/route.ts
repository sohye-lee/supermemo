
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "prisma/db";
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

const handler =  NextAuth({
  
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/account/login',
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { placeholder: "email", type: "email" },
        password: { type: "password", placeholder:"password" },
      },
      
      async authorize(credentials) {
 
        if (!credentials?.email || !credentials?.password) {
          console.log("credentials missing")
          return null;
        }
        console.log('credentials I got', credentials)

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          }
        });

        if (!user) {
          console.log("no user with this email");
          return null;
        }

        const passwordMatched = await compare(credentials.password, user?.password);

        if (!passwordMatched) {
          console.log("password not matched")
          return null;
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
 
  callbacks: {
     
    async jwt({ token, user,   }) {
      return { ...token, ...user,   };
    },
    async session({ session, token, user }) {
      // session.user = token as any;
      session.user = token as any;
      // session.userId = user.id;
      return session;
    },
  },
 
  // callbacks: {
  //   jwt({ token, account, user }) {
  //     if (account) {
  //       token.accessToken = account.access_token
  //       token.id = user?.id
  //     }
  //     return token
  //   },
  //   session({ session, token }) {
  //       // I skipped the line below coz it gave me a TypeError
  //       // session.accessToken = token.accessToken;
  //       session?.user?.id = token.id;
  
  //       return session;
  //     },
  // },
 
});

export { handler as GET, handler as POST}