import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { CustomAdapter } from '@/lib/custom-adapter'
import prisma from '@/lib/client'
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: CustomAdapter(),
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
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        if (existingUser) {
          const existingAccount = await prisma.account.findFirst({
            where: {
              provider: 'google',
              userId: existingUser.id,
            },
          })

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: 'google',
                type: 'oauth',
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                scope: account.scope,
                token_type: account.token_type,
                id_token: account.id_token,
                expires_at: account.expires_at,
              },
            })
          }
        }
      }

      return true
    },
    async session({ token, session }) {
      session.user.id = token.id as string
      session.user.role = token.role as 'ADMIN' | 'USER'
      return session
    },
  },
})
