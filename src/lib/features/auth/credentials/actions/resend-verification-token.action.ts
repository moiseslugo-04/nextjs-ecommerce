'use server'
import {
  resendVerificationToken,
  VerificationTokenTypes,
} from '@/lib/features/auth/services/verification-token.service'

export async function resendVerificationTokenByEmail(
  email: string,
  type: VerificationTokenTypes
) {
  try {
    return await resendVerificationToken(email, type)
  } catch (error) {
    console.log(error)
  }
}
