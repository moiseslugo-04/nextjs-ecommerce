'use server'

import { verifyAccessToken } from '@/lib/features/jwt/jwt.service'
import { cookies } from 'next/headers'
import { auth } from './oAuth/auth'

export async function getSession() {
  // check if has session with oAuth
  const session = await auth()

  if (session) {
    return {
      provider: 'google',
      payload: {
        role: session.user.role,
        email: session.user.email,
        id: session.user.id,
      }, // or can  be more specific => google
    }
  }

  //Get token from cookies
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get('access_token')?.value

  // if there's not cookie return null
  if (!accessToken) return null // => not session
  try {
    //validate token and return payload and provider
    const { id, email, role } = verifyAccessToken(accessToken)
    return { provider: 'credentials', payload: { id, email, role } }
  } catch {
    // invalid or expired accessToken
    return null
  }
}
