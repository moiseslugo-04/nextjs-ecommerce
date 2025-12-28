'use server'

import { findUserByEmail } from '@features/users/user.repository'
import { setPassword } from '@features/auth/services/auth.service'
import {
  resendVerificationToken,
  VerificationTokenTypes,
} from '@features/auth/services/verification-token.service'
import { registerUser } from '@features/auth/services/auth.service'

export async function checkEmailAction(email: string) {
  try {
    const user = await findUserByEmail(email)

    if (user) {
      return { success: true, exists: true }
    }

    return { success: true, exists: false }
  } catch (error) {
    console.error('checkEmailAction error:', error)

    return {
      success: false,
      exists: false,
      message: 'Internal error',
    }
  }
}
export async function setPasswordAction(password: string, userId: string) {
  try {
    return await setPassword(userId, password)
  } catch (error) {
    console.log(error, 'unexpected error')
  }
}

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

export async function registerAction(formData: FormData) {
  try {
    return await registerUser(formData)
  } catch {
    return { success: false, error: 'Server Error' }
  }
}
