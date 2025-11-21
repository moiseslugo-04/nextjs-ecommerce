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
}
export const emailServices = new ResendServices()
