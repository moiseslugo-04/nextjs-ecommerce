'use server'

import { findUserByEmail } from '@/lib/features/users/user.repository'

export async function checkEmailAction(email: string) {
  try {
    const user = await findUserByEmail(email)

    if (user) {
      return { exists: true }
    }

    return { exists: false }
  } catch {
    throw { exists: false, error: 'Internal error' }
  }
}
