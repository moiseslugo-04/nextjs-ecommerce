import 'server-only'
import { getCookies } from '@lib/utils/cookies'
import { decrypt } from '@features/auth/server/session/session.service'
import { refreshSession } from '@features/auth/server/session/session.service'
import { auth } from '@features/auth/oAuth/auth'
import { redirect } from 'next/navigation'
import { SessionPayload } from '@/lib/features/auth/server/session/types'
import { cache } from 'react'

export const verifySession = cache(async (): Promise<SessionPayload> => {
  // check if has session with oAuth
  const session = await auth()
  if (session) {
    return {
      isAuthenticated: true,
      payload: {
        provider: 'google',
        role: session.user.role,
        email: session.user.email!,
        id: session.user.id,
      },
    }
  }
  const accessToken = await getCookies('access_token')
  if (!accessToken) redirect('/auth/identify')
  try {
    const payload = decrypt(accessToken)
    return {
      isAuthenticated: true,
      payload: { provider: 'credentials', ...payload },
    }
  } catch {
    const refreshed = await refreshSession()
    if (!refreshed.isAuthenticated) redirect('/auth/identify')
    const newAccessToken = await getCookies('access_token')
    if (!newAccessToken) redirect('/auth/identify')
    const payload = decrypt(newAccessToken)
    return {
      isAuthenticated: true,
      payload: { provider: 'credentials', ...payload },
    }
  }
})
