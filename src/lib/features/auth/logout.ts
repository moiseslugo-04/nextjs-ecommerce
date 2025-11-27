'use server'

import { getSession } from '@features/auth/get-session'
import { signOut } from '@features/auth/oAuth/auth'
import { logoutAction } from './credentials/actions/logout.action'

export async function logout() {
  const session = await getSession()
  // logout with oAuth
  if (session?.provider === 'google') {
    await signOut()
    return
  }
  //logout manual
  await logoutAction()
}
