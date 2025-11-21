'use server'
import prisma from '@/lib/client'
import { userServices } from '@/lib/services/userServices'
import { generateRefreshToken, generateToken } from '@/lib/utils/token'
import { loginSchema } from '@/schemas/user'
import { cookies } from 'next/headers'
export async function loginAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = loginSchema.safeParse(data)

  if (!parsed.success) {
    return { error: 'Invalid data', issues: parsed.error.issues }
  }
  const { password, identifier } = parsed.data

  //Search User
  const record = await userServices.findUserByIdentifier(identifier)
  if (!record) return { success: false, error: 'User not Found' }

  //Valid Password
  const matchPassword = await userServices.verifyPassword({
    input: password,
    password: record.password,
  })
  if (!matchPassword) {
    return { success: false, error: 'Invalid Credentials' }
  }

  //Check if the email is verified
  if (!record.emailVerified) {
    return { success: false, error: 'Email not verified' }
  }

  // Create token and refreshToken
  const accessToken = generateToken(record)
  const refreshToken = generateRefreshToken(record.id.toString())
  const refreshExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
  // AuthRepository
  prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: record.id,
      expiresAt: refreshExpires,
    },
  })

  const cookiesStore = await cookies()
  cookiesStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 15,
    path: '/',
  })
  cookiesStore.set('refresh_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  cookiesStore.set('is_authenticated', 'true', {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15,
    path: '/',
  })
  return { success: true }
}
