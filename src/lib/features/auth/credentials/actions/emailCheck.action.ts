'use server'

import { findUserByEmail } from '@/lib/features/users/user.repository'

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
