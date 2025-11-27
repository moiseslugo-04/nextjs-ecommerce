'use server'

import { resetPassword } from './auth.service'

export async function resetPasswordAction(password: string, userId: number) {
  try {
    return await resetPassword(password, userId)
  } catch (error) {
    console.log(error, 'unexpected error')
  }
}
