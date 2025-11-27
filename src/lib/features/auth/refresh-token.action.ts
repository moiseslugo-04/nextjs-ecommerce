import { setCookies, getCookies } from '@lib/services/cookiesServices'
import {
  createAccessToken,
  verifyRefreshToken,
} from '@lib/features/jwt/jwt.service'
import { findUserById } from '@lib/features/users/user.repository'
import { NextRequest, NextResponse } from 'next/server'
import { clearSession, redirectTo, setHeaders, userHeaders } from '@/proxy'
export async function refreshSession(
  response: NextResponse,
  request: NextRequest,
  loginUrl: URL
) {
  const refreshToken = await getCookies('refresh_token')
  const callback = loginUrl.searchParams.get('callback') || '/'
  if (!refreshToken) return clearSession(redirectTo(loginUrl))
  try {
    const payload = verifyRefreshToken(refreshToken)
    const user = await findUserById(Number(payload.userId))
    if (!user) throw new Error('user not found')

    const accessToken = createAccessToken({
      userId: user.id.toString(),
      role: user.role,
      email: user.email,
    })

    setCookies({
      response,
      name: 'access_token',
      value: accessToken,
      options: { path: '/', maxAge: 60 * 15 },
    })
    // const headers = response.headers

    setHeaders(
      response,
      userHeaders({
        email: user.email,
        role: user.role,
        userId: user.id.toString(),
      })
    )
    response.headers.set('Location', callback)
    return new NextResponse(null, {
      status: 302,
      headers: response.headers,
    })
  } catch {
    return clearSession(redirectTo(loginUrl))
  }
}
