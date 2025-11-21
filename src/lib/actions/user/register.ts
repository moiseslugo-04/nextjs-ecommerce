'use server'
import { userServices } from '@/lib/services/userServices'
import { registerSchema } from '@/schemas/user'

export async function registerAction(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData) as Record<string, string>
    const result = registerSchema.safeParse(rawData)
    if (!result.success) return { success: false, error: 'Invalid data' }
    return await userServices.createUser(result.data)
  } catch (err) {
    console.error(err)
    return { success: false, error: 'Server Error' }
  }
}
