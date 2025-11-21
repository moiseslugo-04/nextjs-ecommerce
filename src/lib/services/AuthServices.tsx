import { verificationTokenRepository } from '../repositories/verificationTokenRepository'
import { generateVerificationToken } from '../utils/token'
import { VerifyEmail } from '@components/emails/VerifyEmail'
import { emailServices } from './emailServices'
interface CreateToken {
  identifier: string
  expiresInHours: number
}
class AuthServices {
  async createVerificationToken({
    identifier,
    expiresInHours = 24,
  }: CreateToken) {
    const { value, expiresAt } = generateVerificationToken({
      expired: expiresInHours,
    })
    return verificationTokenRepository.createToken({
      identifier,
      value,
      expiresAt,
    })
  }

  async createEmailVerification(email: string) {
    const verificationToken = await this.createVerificationToken({
      identifier: email,
      expiresInHours: 24,
    })
    await this.sendVerificationEmail(email, verificationToken.value)
    return verificationToken
  }

  private async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`
    await emailServices.sendEmail({
      to: email,
      subject: 'Verify your email address',
      react: <VerifyEmail verifyUrl={verifyUrl} />,
    })
    return { success: true, message: 'email send with success' }
  }
}

export const authServices = new AuthServices()
