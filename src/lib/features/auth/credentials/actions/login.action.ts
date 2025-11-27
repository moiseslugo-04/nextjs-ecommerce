'use server'
import { cookies } from 'next/headers'
import { login } from '@features/auth/services/auth.service'
import { ServicesResponsePromise } from '@/types'
import { UserDTO } from '@/lib/features/users/user.repository'
const ACCESS_TOKEN_EXPIRY = 15 * 60
const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60
export async function loginAction(
  formData: FormData
): ServicesResponsePromise<UserDTO | null> {
  const result = await login(formData)
  if (!result.success)
    return {
      success: false,
      error: result.error,
      code: result.code,
      action: result.action,
    }
  const { accessToken, refreshToken, refreshTokenJti, user } = result.data!

  const cookiesStore = await cookies()
  cookiesStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ACCESS_TOKEN_EXPIRY,
    path: '/',
  })
  cookiesStore.set('refresh_token_jti', refreshTokenJti, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: REFRESH_TOKEN_EXPIRY,
    path: '/',
  })
  cookiesStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: REFRESH_TOKEN_EXPIRY,
    path: '/',
  })

  cookiesStore.set('is_authenticated', 'true', {
    secure: true,
    sameSite: 'lax',
    maxAge: ACCESS_TOKEN_EXPIRY,
    path: '/',
  })

  return { success: true, data: user }
}
