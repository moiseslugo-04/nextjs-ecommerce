import 'server-only'

import {
  AccessTokenPayload,
  PayloadAccessToken,
  SessionData,
  SessionPayload,
} from '@/lib/features/auth/server/session/types'
import jwt from 'jsonwebtoken'
import { setCookies, deleteManyCookies, getCookies } from '@lib/utils/cookies'
import {
  createRefreshToken,
  refreshToken,
} from '@features/auth/server/refresh/refresh.service'
import { auth } from '@features/auth/oAuth/auth'
import { findUserById } from '@/lib/features/users/user.repository'
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const ACCESS_TOKEN_EXPIRY = 15 * 60
const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60

export function encrypt({ id, email, role }: AccessTokenPayload) {
  return jwt.sign({ id, email, role }, JWT_ACCESS_SECRET, {
    issuer: 'gechis',
    expiresIn: '15m',
  })
}
export function decrypt(accessToken: string) {
  return jwt.verify(accessToken, JWT_ACCESS_SECRET, {
    issuer: 'gechis',
  }) as PayloadAccessToken
}

export async function createSession(userData: SessionData) {
  const accessToken = encrypt(userData)
  const { payload } = await createRefreshToken(userData.id)

  await Promise.all([
    setCookies({
      name: 'access_token',
      value: accessToken,
      options: {
        maxAge: ACCESS_TOKEN_EXPIRY,
      },
    }),
    setCookies({
      name: 'refresh_token_jti',
      value: payload.refreshJti,
      options: {
        maxAge: REFRESH_TOKEN_EXPIRY,
      },
    }),
    setCookies({
      name: 'refresh_token',
      value: payload.refresh,
      options: {
        maxAge: REFRESH_TOKEN_EXPIRY,
      },
    }),
  ])
}

export async function getSession(): Promise<SessionPayload> {
  const session = await auth()
  if (session) {
    return {
      isAuthenticated: true,
      payload: {
        provider: 'google',
        role: session.user.role,
        email: session.user.email,
        id: session.user.id,
      },
    }
  }

  const accessToken = await getCookies('access_token')
  if (!accessToken) return await refreshSession()
  try {
    const payload = decrypt(accessToken)

    // If the token is about to expire in the next 2 minutes, refresh it
    const now = Date.now() / 1000
    const timeLeft = payload.exp - now
    if (timeLeft < 120) {
      return await refreshSession()
    }
    return {
      isAuthenticated: true,
      payload: {
        provider: 'credentials',
        role: payload.role,
        email: payload.email,
        id: payload.id,
      },
    }
  } catch (error) {
    console.log('Error decrypting access token:', error)
    return await refreshSession()
  }
}

export async function refreshSession(): Promise<SessionPayload> {
  const refreshed = await refreshToken()
  if (!refreshed.success) {
    await deleteSession()
    return { isAuthenticated: false }
  }
  const user = await findUserById(refreshed.userId)
  if (!user) {
    await deleteSession()
    return { isAuthenticated: false }
  }

  const { id, email, role } = user
  const newAccessToken = encrypt({ id, email, role })
  await setCookies({
    name: 'access_token',
    value: newAccessToken,
    options: {
      maxAge: ACCESS_TOKEN_EXPIRY,
    },
  })
  try {
    return {
      isAuthenticated: true,
      payload: { provider: 'credentials', id, email, role },
    }
  } catch (error) {
    console.log('Error decrypting new access token:', error)
    deleteSession()
    return { isAuthenticated: false }
  }
}

export async function deleteSession() {
  await deleteManyCookies([
    'refresh_token',
    'refresh_token_jti',
    'access_token',
  ])
}
