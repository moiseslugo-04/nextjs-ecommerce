'use server'
import { authServices } from '@/lib/services/AuthServices'
export async function sendVerificationEmailAction(email: string) {
  try {
    return await authServices.sendToken(email, 'email_verification')
  } catch {
    return { success: false, error: 'Server error' }
  }
}
