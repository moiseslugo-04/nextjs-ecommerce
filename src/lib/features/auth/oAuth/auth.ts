import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { CustomAdapter } from '@/lib/custom-adapter'
import { findUserByEmail } from '@features/users/user.repository'
import { connectGoogleAccount } from '@features/account/account.service'
import { createProfile } from '../../profile/server/profile.service'
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: CustomAdapter(),
  providers: [
    Google({
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await findUserByEmail(user.email!)
        if (existingUser) {
          await connectGoogleAccount({
            account: {
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
            userId: existingUser.id,
          })
          await createProfile({ userId: existingUser.id })
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role!
        token.id = user.id!
        token.email = user.email
      }
      return token
    },
    async session({ token, session }) {
      session.user.id = token.id as string
      session.user.role = token.role as 'ADMIN' | 'USER'
      session.user.email = token.email ?? ''
      return session
    },
  },
})
