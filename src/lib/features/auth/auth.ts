import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@lib/client'
import { findUserByIdentifier } from '../users/user.repository'
import { ERROR_MESSAGE } from '@/lib/utils/constants'
import bcrypt from 'bcryptjs'
import { createAccessToken, createRefreshToken } from '../jwt/jwt.service'
import { v4 as uuidv4 } from 'uuid'
import { saveRefreshToken } from '../refreshToken/refresh-token.repository'
import { AuthError } from 'next-auth'
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      async authorize(credentials) {
        if (!credentials.password || !credentials.identifier) {
          throw new AuthError('CREDENTIALS_REQUIRED')
        }
        const { password, identifier } = credentials

        const user = await findUserByIdentifier(identifier as string)
        if (!user) throw new AuthError('USER_NOT_FOUND')

        //Valid Password
        const matchPassword = await bcrypt.compare(
          password as string,
          user.password
        )
        if (!matchPassword) throw new AuthError('INVALID_CREDENTIALS')

        //Check if the email is verified
        if (!user.emailVerified) throw new AuthError('EMAIL_NOT_VERIFIED')
        const jti = uuidv4()

        // Create token and refreshToken
        const { id, email, role } = user
        const accessToken = createAccessToken({
          userId: id.toString(),
          email,
          role,
        })
        const refreshToken = createRefreshToken({
          userId: id.toString(),
          jti,
        })
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 7)
        const { password: _password, ...userData } = user
        //save in db
        await saveRefreshToken({
          userId: user.id,
          token: refreshToken,
          jti,
          expiresAt,
        })

        return {
          id: user.id.toString(),
          email: user.email,
          accessToken,
          refreshToken,
        }
      },
    }),
  ],
})
