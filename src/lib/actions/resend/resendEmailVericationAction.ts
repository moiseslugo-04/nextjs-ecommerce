'use server'
import { authServices } from '@/lib/services/AuthServices'

export async function resendEmailVerificationAction(email: string) {
  await authServices.resendToken(email, 'email_verification')
  return { success: true, message: 'Verification email resent' }
}
