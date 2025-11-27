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
  },
} satisfies NextAuthConfig
