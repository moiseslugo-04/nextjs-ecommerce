import { SetPasswordEmail } from '@features/email/components/SetPasswordEmail'
import { ResetPasswordEmail } from '@features/email/components/ResetPasswordEmail'
import { VerifyEmail } from '@/features/email/components/VerifyEmail'
import { ReactNode } from 'react'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  react: ReactNode
}

async function sendEmail({ to, subject, react }: EmailOptions) {
  await resend.emails.send({
    from: 'Gechis <onboarding@gechis.com>',
    to,
    subject,
    react,
  })
}

export async function sendEmailVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/email/?token=${token}`
  await sendEmail({
    to: email,
    subject: 'Verify your email address',
    react: <VerifyEmail verifyUrl={verifyUrl} />,
  })
  return { success: true, message: 'email send with success' }
}
export async function sendEmailResetPassword(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/reset-password?token=${token}`
  await sendEmail({
    to: email,
    subject: 'Reset password',
    react: <ResetPasswordEmail resetUrl={resetUrl} />,
  })
  return { success: true, message: 'email send with success' }
}

export async function sendEmailSetPassword(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/set-password?token=${token}`
  await sendEmail({
    to: email,
    subject: 'Set Password',
    react: <SetPasswordEmail resetUrl={resetUrl} />,
  })
  return { success: true, message: 'email send with success' }
}
