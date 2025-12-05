import { generatorRandomToken } from '@/lib/utils/utils'
import {
  findRefreshTokenByJti,
  revokeRefreshToken,
  saveRefreshToken,
} from '@features/auth/repository/refresh-token.repository'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

export async function generateRefreshToken(userId: string) {
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

export async function validateRefreshToken(token: string, jti: string) {
  const refreshToken = await findRefreshTokenByJti(jti)

  if (!refreshToken)
    return {
      success: false,
      error: 'Refresh token not found',
      code: 'NOT_FOUND',
    }

  //Check if it expired
  if (refreshToken.expiresAt < new Date()) {
    return {
      success: false,
      error: 'Token  is expired',
      code: 'EXPIRED',
    }
  }

  const match = await bcrypt.compare(token, refreshToken.token)
  if (!match) {
    return { success: false, error: 'Invalid token', code: 'INVALID_TOKEN' }
  }

  //check if the token has not been revoked
  if (refreshToken.revoked) {
    return {
      success: false,
      error: 'Token already revoked',
      code: 'REVOKED',
    }
  }

  //revoked token and generate new token to rotation
  await revokeRefreshToken(jti)
  const newToken = await generateRefreshToken(refreshToken.userId)

  return {
    success: true,
    payload: newToken.payload,
  }
}
