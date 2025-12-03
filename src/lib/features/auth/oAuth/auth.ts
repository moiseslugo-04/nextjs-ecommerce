import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { CustomAdapter } from '@/lib/custom-adapter'
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: CustomAdapter(),
  pages: {
    signIn: '/auth',
  },
  providers: [Google],
  session: { strategy: 'jwt', maxAge: 15 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role!
        token.id = user.id!
      }
      return token
    },
    async session({ token, session }) {
      session.user.id = token.id as string
      session.user.role = token.role as 'ADMIN' | 'USER'
      return session
    },
  },
})
