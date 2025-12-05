import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/features/auth/services/jwt.service'
import {
  isPrivateRoute,
  isAuthRoute,
  isAdminRoute,
} from './lib/utils/server.utils'
import { refreshSession } from './lib/features/auth/credentials/actions/refresh-token.action'
import { deleteManyCookies } from './lib/services/cookiesServices'
import { auth } from './lib/features/auth/oAuth/auth'

interface Payload {
  id: string
  role: string
  email: string
}

export function redirectTo(url: URL) {
  return NextResponse.redirect(url)
}

export function clearSession(res: NextResponse) {
  return deleteManyCookies(res, [
    'access_token',
    'refresh_token',
    'refresh_token_jti',
    'is_authenticated',
  ])
}

export function userHeaders(payload: Payload) {
  return {
    'X-user-id': payload.id,
    'X-user-role': payload.role,
  }
}

export function setHeaders(
  response: NextResponse,
  headers: Record<string, string>
) {
  for (const key in headers) {
    response.headers.set(key, headers[key])
  }
}
export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname
  const accessToken = request.cookies.get('access_token')?.value

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return response
  }

  const loginUrl = new URL('/auth/login', request.url)
  let callback = pathname + request.nextUrl.search
  if (!callback.startsWith('/')) callback = '/'
  loginUrl.searchParams.set('callback', callback)

  let payload: Payload | null = null

  //Token with credentials
  if (accessToken) {
    try {
      const decoded = verifyAccessToken(accessToken)

      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000)

      if (expiresIn < 3 * 60) {
        const refreshed = await refreshSession(response, request)
        if (refreshed?.ok) return refreshed.response
        return clearSession(redirectTo(loginUrl))
      }

      payload = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
      }
    } catch {
      const refreshed = await refreshSession(response, request)
      if (refreshed?.ok) return refreshed.response
      return clearSession(redirectTo(loginUrl))
    }
  }

  // if there's not login with credentials check oAuth (google)
  if (!payload) {
    const session = await auth()
    if (session?.user) {
      payload = {
        id: session.user.id,
        role: session.user.role,
        email: session.user.email ?? '',
      }
    }
  }

  //if has not session
  if (!payload) {
    const isPrivate = isPrivateRoute(pathname)
    const isAtAuth = isAuthRoute(pathname)

    if (isPrivate && !isAtAuth) {
      return clearSession(redirectTo(loginUrl))
    }

    return response
  }

  // Check if is admin
  if (isAdminRoute(pathname) && payload.role !== 'ADMIN') {
    const redirect = new URL('/', request.url)
    redirect.searchParams.set('error', 'no-admin')
    return redirectTo(redirect)
  }

  //if have session redirect
  if (isAuthRoute(pathname)) {
    return redirectTo(new URL('/', request.url))
  }

  // set headers
  setHeaders(response, userHeaders(payload))

  return response
}
