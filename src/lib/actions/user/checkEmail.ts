'use server'

import { userServices } from '@/lib/services/userServices'
export async function checkEmail(email: string) {
  return userServices.findByEmail(email)
}
