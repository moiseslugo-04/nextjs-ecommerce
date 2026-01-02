import {
  saveVerificationToken,
  getVerificationToken,
  deleteExistingTokes,
} from '@/features/auth/repository/verification-token-repository'

import { generatorRandomToken } from '@lib/utils/tokenGenerator'

import { TokenInput } from '../types'

export async function generateVerificationToken({
  userId,
  type,
  identifier,
  expiresInHours = 24,
}: TokenInput) {
  // remove existing tokens of the same type
  await deleteExistingTokes(userId, type)
  //Generate new token
  const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
  const token = generatorRandomToken(32)

  //Save token in the DB
  return saveVerificationToken({
    userId,
    type,
    identifier,
    token,
    expiresAt,
  })
}

export async function validateVerificationToken(token: string) {
  //Look for the token in the DB
  const record = await getVerificationToken(token)
  const now = new Date()
  if (!record)
    return {
      success: false,
      token: null,
      error: 'Token not Found',
      expired: false,
    }
  //Check if expired
  const expired = record.expiresAt < now

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
