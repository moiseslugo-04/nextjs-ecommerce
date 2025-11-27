import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@lib/features/jwt/jwt.service'
import {
  isPrivateRoute,
  isAuthRoute,
  isAdminRoute,
} from './lib/utils/server.utils'
import { refreshSession } from './lib/features/auth/refresh-token.action'
import {
  deleteManyCookies,
  getCookies,
  setCookies,
} from './lib/services/cookiesServices'
interface Payload {
  userId: string
  role: string
  email: string
}
export function redirectTo(url: URL) {
  return NextResponse.redirect(url)
}
export function userHeaders(payload: Payload) {
  return {
    'X-user-id': payload.userId,
    'X-user-role': payload.role,
    'X-user-email': payload.email,
  }
}
export function clearSession(res: NextResponse) {
  return deleteManyCookies(res, [
    'access_token',
    'refresh_token',
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
  const pathname = request.nextUrl.pathname
  const accessToken = await getCookies('access_token')
  const response = NextResponse.next()

  const loginUrl = new URL('/auth', request.url)
  loginUrl.searchParams.set('callback', request.nextUrl.toString())

  if (isPrivateRoute(pathname) && !accessToken) {
    return refreshSession(response, request, loginUrl)
  }

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken)
      if (isAdminRoute(pathname) && payload.role !== 'ADMIN') {
        console.log('rund')
        const redirect = new URL('/', request.url)
        redirect.searchParams.set('error', 'no-admin')
        return redirectTo(redirect)
      }
      // If user is already logged and tries to access /auth
      if (isAuthRoute(pathname)) {
        const redirectPath = payload.role === 'ADMIN' ? '/dashboard' : '/'
        return redirectTo(new URL(redirectPath, request.url))
      }

      setHeaders(response, userHeaders(payload))
      setCookies({ response, name: 'user-role', value: payload.role })
      return response
    } catch {
      return refreshSession(response, request, loginUrl)
    }
  }

  return response // for non private routes
}
