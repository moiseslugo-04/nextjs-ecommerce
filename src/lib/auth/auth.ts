import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@lib/client'
import { userServices } from '../services/userServices'
class CustomError extends Error {
  constructor(message: string, options: { cause?: Error; code?: string }) {
    super(message, options)
    this.name = 'CustomError'
  }
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.identifier && !credentials.password) {
          throw new CustomError('Missing credentials', {
            code: 'MISSING_CREDENTIALS',
            cause: new Error('Identifier or password not provided'),
          })
        }
        const { identifier, password } = credentials
        const user = await userServices.findUserByIdentifier(
          identifier as string
        )

        if (!user) {
          throw new CustomError('User not found', {
            code: 'USER_NOT_FOUND',
            cause: new Error('Identifier or password not provided'),
          })
        }
        const checkPassword = await userServices.verifyPassword({
          input: password as string,
          password: user.password,
        })
        if (!checkPassword) {
          throw new Error('Invalid password')
        }
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
})
