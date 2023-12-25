import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { db } from 'prisma/db';
import { authOptions } from '@/app/lib/auth';

// const handler = NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/account/login',
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials, req) {
//         const user = await db.user.findUnique({
//           where: {
//             email: credentials?.email,
//           },
//         });
//         const checkedPassword = await compare(
//           credentials?.password || '',
//           user?.password || ''
//         );

//         if (checkedPassword && user) {
//           return {
//             id: user.id,
//             email: user.email,
//           };
//         }
//         return user;
//       },
//     }),
//   ],
// });

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
