'use server'
import { ServicesResponsePromise } from '@/types'
import { login } from '@features/auth/services/auth.service'
import {
  createSession,
  deleteSession,
} from '@/lib/features/auth/server/session/session.service'
import { UserDTO } from '@features/users/user.repository'
import { redirect } from 'next/navigation'
import { signOut } from '../oAuth/auth'
import { verifySession } from '@/lib/dal/session'
import { getSession } from '@features/auth/server/session/session.service'
export async function signup(
  formData: FormData
): Promise<ServicesResponsePromise<UserDTO | null>> {
  const result = await login(formData)
  if (!result.success) return result
  const user = result.data!
  await createSession({ id: user.id, role: user.role, email: user.email })
  return { success: true, data: user }
}

export async function logout() {
  const session = await verifySession()
  if (session.isAuthenticated && session.payload.provider === 'google') {
    await signOut()
    return
  }
  await deleteSession()
  redirect('/auth/identify')
}

export async function getSessionAction() {
  return await getSession()
}
