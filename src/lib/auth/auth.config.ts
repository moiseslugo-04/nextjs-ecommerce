import { NextAuthConfig } from 'next-auth'
export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [],
  callbacks: {
    async authorized({ auth, request }) {
      const { pathname } = request.nextUrl
      const isLoggedIn = !!auth?.user
      const protectedPaths = ['/dashboard']
      const isProtectedPath = protectedPaths.some((path) =>
        pathname.startsWith(path)
      )

      return isProtectedPath && !isLoggedIn ? false : true
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.id = user.id
        token.name = user.name
        return token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        return session
      }
      return session
    },
  },
} satisfies NextAuthConfig
