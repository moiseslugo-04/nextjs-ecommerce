import { ERROR_MESSAGE } from '@/lib/utils/constants'
import { ServicesResponsePromise } from '@/types'
import {
  sendEmailResetPassword,
  sendEmailSetPassword,
  sendEmailVerificationEmail,
} from '@lib/features/email/email.service'
import { findUserByEmail, UserDTO } from '@lib/features/users/user.repository'
import { deleteExistingTokes } from '@lib/features/verificationToken/verification-token-repository'
import { generateVerificationToken } from '@features/verificationToken/verification-token.service'
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
