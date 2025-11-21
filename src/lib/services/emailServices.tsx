import { ResetPasswordEmail } from '@/components/emails/ResetPasswordEmail'
import { VerifyEmail } from '@/components/emails/VerifyEmail'
import 'dotenv/config'
import { ReactNode } from 'react'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
interface EmailOptions {
  to: string
  subject: string
  react: ReactNode
}
class ResendServices {
  async sendEmail({ to, subject, react }: EmailOptions) {
    await resend.emails.send({
      from: 'Gechis <onboarding@resend.dev>',
      to,
      subject,
      react,
    })
  }
  async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`
    await this.sendEmail({
      to: email,
      subject: 'Verify your email address',
      react: <VerifyEmail verifyUrl={verifyUrl} />,
    })
    return { success: true, message: 'email send with success' }
  }
  async sendResetPasswordEmail(email: string, token: string) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
    await this.sendEmail({
      to: email,
      subject: 'Reset password',
      react: <ResetPasswordEmail resetUrl={resetUrl} />,
    })
    return { success: true, message: 'email send with success' }
  }
}
export const emailServices = new ResendServices()
