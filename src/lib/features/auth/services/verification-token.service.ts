import { ERROR_MESSAGE } from '@/lib/utils/constants/constants'
import { ServicesResponsePromise } from '@/types'
import {
  saveVerificationToken,
  findVerificationTokenByToken,
  deleteVerificationTokenByToken,
  deleteExistingTokes,
} from '@/lib/features/auth/repository/verification-token-repository'

import { generatorRandomToken } from '@lib/utils/tokenGenerator'

import {
  sendEmailResetPassword,
  sendEmailSetPassword,
  sendEmailVerificationEmail,
} from '@lib/features/email/email.service'
import { findUserByEmail } from '@lib/features/users/user.repository'
import { UserDTO } from '@features/users/types'

interface CreateToken {
  type: 'email_verification' | 'reset_password' | 'set_password'
  identifier?: string
  expiresInHours: number
  userId: string
}

export type VerificationTokenTypes =
  | 'email_verification'
  | 'reset_password'
  | 'set_password'
export async function generateEmailVerificationToken(
  email: string
): ServicesResponsePromise<UserDTO | null> {
  const user = await findUserByEmail(email)

  if (!user)
    return {
      success: false,
      error: ERROR_MESSAGE.USER_NOT_FOUND.message,
      code: ERROR_MESSAGE.USER_NOT_FOUND.code,
    }

  const token = await generateVerificationToken({
    userId: user.id,
    type: 'email_verification',
    expiresInHours: 24,
    identifier: user.email,
  })

  await sendEmailVerificationEmail(email, token.token)
  return { success: true, data: user, message: 'Verification email sent' }
}
export async function generateResetPasswordToken(email: string) {
  const user = await findUserByEmail(email)
  if (!user) return { success: false, error: 'User not found' }
  const token = await generateVerificationToken({
    userId: user.id,
    type: 'reset_password',
    identifier: user.email,
    expiresInHours: 24,
  })
  await sendEmailResetPassword(email, token.token)
  return { success: true, message: 'Verification email sent' }
}
export async function generateSetPasswordToken(email: string) {
  const user = await findUserByEmail(email)
  if (!user) return { success: false, error: 'User not found' }
  const token = await generateVerificationToken({
    userId: user.id,
    type: 'set_password',
    identifier: user.email,
    expiresInHours: 24,
  })
  await sendEmailSetPassword(email, token.token)
  return { success: true, message: 'Verification email sent' }
}

export async function resendVerificationToken(
  email: string,
  type: VerificationTokenTypes
) {
  const user = await findUserByEmail(email)
  if (!user)
    return {
      success: false,
      error: ERROR_MESSAGE.USER_NOT_FOUND.message,
      code: ERROR_MESSAGE.USER_NOT_FOUND.code,
    }
  await deleteExistingTokes(user.id, type)
  const token = await generateVerificationToken({
    userId: user.id,
    type,
    identifier: user.email,
    expiresInHours: 24,
  })
  if (type === 'email_verification') {
    await sendEmailVerificationEmail(email, token.token)
  } else if (type === 'reset_password') {
    await sendEmailResetPassword(email, token.token)
  } else if (type === 'set_password') {
    await sendEmailSetPassword(email, token.token)
  }

  return { success: true, message: 'Email verification was resend' }
}

export async function generateVerificationToken({
  userId,
  type,
  identifier,
  expiresInHours = 24,
}: CreateToken) {
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
  const record = await findVerificationTokenByToken(token)
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
