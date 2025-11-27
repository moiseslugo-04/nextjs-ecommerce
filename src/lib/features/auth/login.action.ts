'use server'
import { cookies } from 'next/headers'
import { login } from './auth.service'
export async function loginAction(formData: FormData) {
  const result = await login(formData)
  if (result.success && result.data) {
    const { accessToken, refreshToken } = result.data
    const cookiesStore = await cookies()
    cookiesStore.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 15,
      path: '/',
    })
    cookiesStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
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
  }
  return result
}
