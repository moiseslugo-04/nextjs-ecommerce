'use server'
import { cookies } from 'next/headers'
import { revokeRefreshToken } from '@features/refreshToken/refresh-token.repository'
export async function logoutAction() {
  const cookiesStore = await cookies()
  const refreshTokenJti = cookiesStore.get('refresh_token_jti')?.value
  if (refreshTokenJti) await revokeRefreshToken(refreshTokenJti)

  cookiesStore.delete('access_token')
  cookiesStore.delete('refresh_token')
  cookiesStore.delete('refresh_token_jti')
  cookiesStore.delete('is_authenticated')
  cookiesStore.delete('user-role')
  cookiesStore.delete('user-id')
  return { success: true, message: 'Successfully logged out' }
}
