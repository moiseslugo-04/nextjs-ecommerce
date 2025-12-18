import 'server-only'

import { generatorRandomToken } from '@/lib/utils/utils'
import {
  findRefreshTokenByJti,
  revokeRefreshToken,
  saveRefreshToken,
} from '@features/auth/server/refresh/refresh.repository'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { getCookies, setCookies } from '@/lib/utils/cookies'
import { refreshTokenPayload, verifyRefreshTokenPayload } from './types'
export async function createRefreshToken(userId: string) {
  const token = generatorRandomToken(32)
  const hashedToken = await bcrypt.hash(token, 10)
  const jti = uuidv4()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  //save token in the DB
  await saveRefreshToken({ userId, token: hashedToken, jti, expiresAt })
  return {
    success: true,
    payload: {
      refresh: token,
      refreshJti: jti,
      userId,
      expiresAt,
    },
  }
}

export async function verifyRefreshToken(): Promise<verifyRefreshTokenPayload> {
  const refresh_Jti = await getCookies('refresh_token_jti')
  const refresh_token = await getCookies('refresh_token')

  if (!refresh_Jti || !refresh_token)
    return { success: false, code: 'NO_REFRESH' }

  const refreshToken = await findRefreshTokenByJti(refresh_Jti)

  if (!refreshToken) return { success: false, code: 'NOT_FOUND' }

  //Check if it expired
  if (refreshToken.expiresAt < new Date())
    return { success: false, code: 'EXPIRED' }

  const match = await bcrypt.compare(refresh_token, refreshToken.token)

  if (!match) return { success: false, code: 'INVALID_TOKEN' }
  if (refreshToken.revoked) return { success: false, code: 'REVOKED' }

  return {
    success: true,
    token_jti: refreshToken.jti,
    userId: refreshToken.userId,
  }
}
export async function refreshToken(): Promise<refreshTokenPayload> {
  const isRefresh = await verifyRefreshToken()
  if (!isRefresh.success) return { success: false, code: 'NO_REFRESH' }

  const { token_jti, userId } = isRefresh

  //Revoke old token and create a new one
  await revokeRefreshToken(token_jti)
  const { payload } = await createRefreshToken(userId)

  //set new Cookies
  await Promise.all([
    setCookies({
      name: 'refresh_token',
      value: payload.refresh,
      options: { maxAge: 30 * 24 * 60 * 60 },
    }),
    setCookies({
      name: 'refresh_token_jti',
      value: payload.refreshJti,
      options: { maxAge: 30 * 24 * 60 * 60 },
    }),
  ])
  return { success: true, userId: payload.userId }
}
