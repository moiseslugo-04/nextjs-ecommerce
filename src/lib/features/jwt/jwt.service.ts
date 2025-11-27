import jwt from 'jsonwebtoken'
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

type AccessTokenPayload = {
  userId: string
  email: string
  role: string
}

type RefreshTokenPayload = {
  userId: string
  jti: string
}

type PayloadAccessToken = {
  userId: string
  email: string
  role: string
  exp: number
  iat: number
}

export function createAccessToken({ userId, email, role }: AccessTokenPayload) {
  return jwt.sign({ userId, email, role }, JWT_ACCESS_SECRET, {
    issuer: 'gechis',
    expiresIn: '15m',
  })
}

export function createRefreshToken({ userId, jti }: RefreshTokenPayload) {
  return jwt.sign({ userId, jti }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
    issuer: 'gechis',
  })
}
export function verifyAccessToken(accessToken: string) {
  return jwt.verify(accessToken, JWT_ACCESS_SECRET, {
    issuer: 'gechis',
  }) as PayloadAccessToken
}

export function verifyRefreshToken(refreshToken: string) {
  return jwt.verify(refreshToken, JWT_REFRESH_SECRET, {
    issuer: 'gechis',
  }) as RefreshTokenPayload
}
