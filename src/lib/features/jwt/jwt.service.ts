import jwt from 'jsonwebtoken'
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

type AccessTokenPayload = {
  id: string
  email: string
  role: string
}
type PayloadAccessToken = {
  id: string
  email: string
  role: string
  exp: number
  iat: number
}

export function createAccessToken({ id, email, role }: AccessTokenPayload) {
  return jwt.sign({ id, email, role }, JWT_ACCESS_SECRET, {
    issuer: 'gechis',
    expiresIn: '15m',
  })
}
export function verifyAccessToken(accessToken: string) {
  return jwt.verify(accessToken, JWT_ACCESS_SECRET, {
    issuer: 'gechis',
  }) as PayloadAccessToken
}
