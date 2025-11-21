import { emailServices } from './emailServices'
import { tokenServices } from './TokenServices'
import { userServices } from './userServices'
/* interface ServiceResponse<T> {
  success: boolean
  data?: T
  error?: string
  warning?: string
}
type ServicePromise<T> = Promise<ServiceResponse<T>> */
class AuthServices {
  async sendToken(
    email: string,
    type: 'email_verification' | 'reset_password'
  ) {
    const user = await userServices.findByEmail(email)
    if (!user)
      return {
        success: false,
        error: 'Invalid email address, please signing and trying again',
      }
    const token = await tokenServices.create({
      userId: user.id,
      type,
      expiresInHours: 24,
    })
    if (type === 'email_verification') {
      await emailServices.sendVerificationEmail(email, token.value)
    }
    if (type === 'reset_password') {
      await emailServices.sendResetPasswordEmail(email, token.value)
    }
    return { success: true, data: token.value }
  }
  async resendToken(
    email: string,
    type: 'email_verification' | 'reset_password'
  ) {
    const user = await userServices.findByEmail(email)
    if (!user)
      return {
        success: false,
        error: 'Invalid email address, please verify and trying again',
      }

    await tokenServices.deleteByIdentifier(user.id, 'email_verification')
    const token = await tokenServices.create({
      userId: user.id,
      expiresInHours: 24,
      type,
    })
    if (type === 'email_verification') {
      await emailServices.sendVerificationEmail(email, token.value)
    }
    if (type === 'reset_password') {
      await emailServices.sendResetPasswordEmail(email, token.value)
    }
  }
}

export const authServices = new AuthServices()
