'use server'

import { setPassword } from '@features/auth/services/auth.service'

export async function setPasswordAction(password: string, userId: string) {
  try {
    return await setPassword(userId, password)
  } catch (error) {
    console.log(error, 'unexpected error')
  }
}
