'use server'
import { authServices } from '@/lib/services/AuthServices'
export async function sendVerificationEmailAction(email: string) {
  try {
    return await authServices.createEmailVerification(email)
  } catch {
    return { success: false, error: 'Server error' }
  }
}
