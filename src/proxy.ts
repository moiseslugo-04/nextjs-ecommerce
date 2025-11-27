import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@lib/features/jwt/jwt.service'
import {
  isPrivateRoute,
  isAuthRoute,
  isAdminRoute,
} from './lib/utils/server.utils'
import { refreshSession } from './lib/features/auth/credentials/actions/refresh-token.action'
import {
  deleteManyCookies,
  getCookies,
  setCookies,
} from './lib/services/cookiesServices'
import { headers } from 'next/headers'

interface Payload {
  id: string
  role: string
  email: string
}

export function redirectTo(url: URL) {
  return NextResponse.redirect(url)
}

export function userHeaders(payload: Payload) {
  return {
    'X-user-id': payload.id,
    'X-user-role': payload.role,
  }
}

export function clearSession(res: NextResponse) {
  return deleteManyCookies(res, [
    'access_token',
    'refresh_token',
    'refresh_token_jti',
    'is_authenticated',
  ])
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
  const accessToken = request.cookies.get('access_token')?.value
  const pathname = request.nextUrl.pathname

  if (!isPrivateRoute(pathname) && !isAuthRoute(pathname)) return response

  //URL to redirect secure never allow external callbacks
  const loginUrl = new URL('/auth', request.url)
  let callback = request.nextUrl.pathname + request.nextUrl.search
  if (!callback.startsWith('/')) callback = '/'
  loginUrl.searchParams.set('callback', callback)
  if (!accessToken) {
    const isAtAuth = isAuthRoute(pathname)
    if (!isAtAuth) {
      const refreshed = await refreshSession(response, request)
      if (refreshed.ok) return refreshed.response
      clearSession(response)
      return redirectTo(loginUrl)
    }
    const refreshed = await refreshSession(response, request)
    if (refreshed.ok && refreshed.response) {
      const redirect = NextResponse.redirect(new URL('/', request.url))

      refreshed.response.cookies.getAll().forEach((cookie) => {
        redirect.cookies.set(cookie)
      })
      return redirect
    }
    return response
  }

  try {
    const payload = verifyAccessToken(accessToken)
    const expiresIn = payload.exp - Math.floor(Date.now() / 1000)
    // Refresh 3 minutes before expiry
    if (expiresIn < 3 * 60) {
      const refreshed = await refreshSession(response, request)
      if (refreshed.ok) return refreshed.response
      clearSession(response)
      return redirectTo(loginUrl)
    }

    // Admin routes
    if (isAdminRoute(pathname) && payload.role !== 'ADMIN') {
      const redirect = new URL('/', request.url)
      redirect.searchParams.set('error', 'no-admin')
      return redirectTo(redirect)
    }

    // Prevent logged users from accessing /auth
    if (isAuthRoute(pathname)) return redirectTo(new URL('/', request.url))

    // Set user headers
    setHeaders(response, userHeaders(payload))
    return response
  } catch {
    const refreshed = await refreshSession(response, request)

    if (refreshed.ok) return refreshed.response

    clearSession(response)
    return redirectTo(loginUrl)
  }
}
