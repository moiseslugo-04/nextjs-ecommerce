import {
  saveVerificationToken,
  findVerificationTokenByToken,
  deleteVerificationTokenByToken,
} from '@lib/features/verificationToken/verification-token-repository'
import { generatorRandomToken } from '@lib/utils/tokenGenerator'
interface CreateToken {
  type: 'email_verification' | 'reset_password'
  identifier?: string
  expiresInHours: number
  userId: number
}

export async function generateVerificationToken({
  userId,
  type,
  identifier,
  expiresInHours = 24,
}: CreateToken) {
  const token = generatorRandomToken(32)
  const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
  return saveVerificationToken({
    userId,
    type,
    identifier,
    token,
    expiresAt,
  })
}

export async function validateVerificationToken(token: string) {
  const record = await findVerificationTokenByToken(token)
  const now = new Date()
  if (!record)
    return {
      success: false,
      token: null,
      error: 'Token not Found',
      expired: false,
    }

  const expired = record.expiresAt < now
  await deleteVerificationTokenByToken(record.token)

  if (expired) {
    return {
      success: false,
      token: null,
      error: 'Expired Token',
      expired: true,
    }
  }
  return {
    success: true,
    token: record,
    error: '',
    expired: false,
  }
}
