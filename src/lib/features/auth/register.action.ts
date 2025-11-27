'use server'
import { registerUser } from '@lib/features/auth/auth.service'
export async function registerAction(formData: FormData) {
  try {
    return await registerUser(formData)
  } catch {
    return { success: false, error: 'Server Error' }
  }
}
