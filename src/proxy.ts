import { NextRequest, NextResponse } from 'next/server'
import {
  decrypt,
  refreshSession,
} from '@/lib/features/auth/server/session/session.service'

import {
  isPrivateRoute,
  isAuthRoute,
  isAdminRoute,
} from './lib/utils/server.utils'
import { auth } from '@features/auth/oAuth/auth'
interface Payload {
  id: string
  role: string
  email: string
}

export const redirectTo = (url: URL) => NextResponse.redirect(url)
export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname
  const accessToken = request.cookies.get('access_token')?.value

  const isAuth = isAuthRoute(pathname)
  const isAdmin = isAdminRoute(pathname)
  const isPrivate = isPrivateRoute(pathname)

  const loginUrl = new URL('/auth/identify', request.url)
  loginUrl.searchParams.set('callback', pathname + request.nextUrl.search)

  let payload: Payload | null = null

  if (accessToken) {
    try {
      payload = decrypt(accessToken)
    } catch {
      payload = null
    }
  }

  if (!payload) {
    const session = await auth()
    if (session?.user) {
      payload = {
        id: session.user.id,
        role: session.user.role,
        email: session.user.email,
      }
    }
  }

  if (!payload && isPrivate && !isAuth) return redirectTo(loginUrl)

  // Admin access permission check
  if (isAdmin && payload?.role !== 'ADMIN') {
    const redirect = new URL('/', request.url)
    redirect.searchParams.set('error', 'no-admin')
    return redirectTo(redirect)
  }

  if (!payload && isAuth) {
    const refresh = await refreshSession()
    if (!refresh.isAuthenticated) return response
    const callback = request.nextUrl.searchParams.get('callback') ?? '/'
    return redirectTo(new URL(callback, request.url))
  }

  if (isAuth && payload) {
    if (payload.role === 'ADMIN') {
      return redirectTo(new URL('/dashboard', request.url))
    }

    return redirectTo(new URL('/', request.url))
  }

  return response
}
