import { SetPasswordEmail } from '@features/email/components/SetPasswordEmail'
import { ResetPasswordEmail } from '@features/email/components/ResetPasswordEmail'
import { VerifyEmail } from '@/features/email/components/VerifyEmail'
import { EmailOptions } from './types'
import { Resend } from 'resend'
import { UserDTO } from '../users/types'
import { generateVerificationToken } from '../auth/services/verification-token.service'
import { VerificationTokenTypes } from '../auth/types'
import { ERROR_MESSAGE } from '@/lib/utils/constants/constants'
import { findUserByEmail } from '../users/user.repository'
const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmail({ to, subject, react }: EmailOptions) {
  await resend.emails.send({
    from: 'Gechis <onboarding@gechis.com>',
    to,
    subject,
    react,
  })
}

export async function sendEmailVerificationEmail(user: UserDTO) {
  //create token
  const { token } = await generateVerificationToken({
    type: 'email_verification',
    identifier: user.email,
    expiresInHours: 24,
    userId: user.id,
  })

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`
  await sendEmail({
    to: user.email,
    subject: 'Verify your email address',
    react: <VerifyEmail verifyUrl={verifyUrl} />,
  })
  return { success: true, message: 'email send with success' }
}
export async function sendEmailResetPassword(user: UserDTO) {
  //create token
  const { token } = await generateVerificationToken({
    type: 'reset_password',
    identifier: user.email,
    expiresInHours: 24,
    userId: user.id,
  })
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`
  await sendEmail({
    to: user.email,
    subject: 'Reset password',
    react: <ResetPasswordEmail resetUrl={resetUrl} />,
  })
  return { success: true, message: 'email send with success' }
}

export async function sendEmailSetPassword(user: UserDTO) {
  //create token
  const { token } = await generateVerificationToken({
    type: 'reset_password',
    identifier: user.email,
    expiresInHours: 24,
    userId: user.id,
  })
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/set-password?token=${token}`
  await sendEmail({
    to: user.email,
    subject: 'Set Password',
    react: <SetPasswordEmail resetUrl={resetUrl} />,
  })
  return { success: true, message: 'email send with success' }
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
  if (type === 'email_verification') {
    await sendEmailVerificationEmail(user)
  } else if (type === 'reset_password') {
    await sendEmailResetPassword(user)
  } else if (type === 'set_password') {
    await sendEmailSetPassword(user)
  }

  return { success: true, message: 'Email verification was resend' }
}
