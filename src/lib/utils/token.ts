import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import 'dotenv'

const JWT_SECRET = process.env.JWT_SECRET_SIGNATURE!
export function generateToken(user: Partial<User>): string {
  const payload = {
    email: user.email,
    userId: user.id,
    role: user.role,
  }
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: '15m',
    issuer: 'gechis',
  })
}

export function generateVerificationToken({
  expired = 24,
}: {
  expired: number
}) {
  const value = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + expired * 60 * 60 * 1000)
  return { value, expiresAt }
}

export function verifyToken(token: string): {
  userId: string
  email: string
  role: string
} {
  try {
    const payload = jwt.verify(token, JWT_SECRET, { issuer: 'gechis' }) as {
      userId: string
      email: string
      role: string
      exp: number
      iat: number
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Invalid token or expired')
  }
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId, type: 'refresh' }, JWT_SECRET, {
    expiresIn: '7',
    issuer: 'gechis',
  })
}
