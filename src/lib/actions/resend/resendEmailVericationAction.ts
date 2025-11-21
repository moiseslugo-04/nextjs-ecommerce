'use server'
import { authServices } from '@/lib/services/AuthServices'
import { verificationTokenRepository } from '@/lib/repositories/verificationTokenRepository'

export async function resendEmailVerificationAction(email: string) {
  const token = await verificationTokenRepository.findIdentifier(email)
  if (token) {
    await verificationTokenRepository.deleteById(token?.id)
  }
  await authServices.createEmailVerification(email)
  return { success: true, message: 'Verification email resent' }
}
