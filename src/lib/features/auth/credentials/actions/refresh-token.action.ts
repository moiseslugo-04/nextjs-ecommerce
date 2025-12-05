import { setCookies } from '@lib/services/cookiesServices'
import { createAccessToken } from '@features/auth/services/jwt.service'
import { NextRequest, NextResponse } from 'next/server'
import { setHeaders, userHeaders } from '@/proxy'
import { validateRefreshToken } from '@features/auth/services/refresh-token.service'
import { findUserById } from '@features/users/user.repository'
export async function refreshSession(
  response: NextResponse,
  request: NextRequest
) {
  const refreshToken = request.cookies.get('refresh_token')?.value
  const refreshTokenJti = request.cookies.get('refresh_token_jti')?.value
  if (!refreshToken || !refreshTokenJti) return { ok: false }

  try {
    const result = await validateRefreshToken(refreshToken, refreshTokenJti)
    if (!result.success) return { ok: false }
    const { refresh, refreshJti, userId } = result.payload!

    //Get user to generate accessToken with update data
    const user = await findUserById(userId)
    if (!user) return { ok: false }

    // create accessToken
    const accessToken = createAccessToken({
      id: userId,
      role: user?.role,
      email: user?.email,
    })

    setCookies({
      response,
      name: 'access_token',
      value: accessToken,
      options: { path: '/', maxAge: 60 * 15 },
    })
    setCookies({
      response,
      name: 'refresh_token',
      value: refresh!,
      options: { path: '/', maxAge: 60 * 60 * 24 * 15 },
    })

    setCookies({
      response,
      name: 'refresh_token_jti',
      value: refreshJti!,
      options: { path: '/', maxAge: 60 * 60 * 24 * 15 },
    })

    setHeaders(
      response,
      userHeaders({ email: user?.email, role: user?.role, id: userId })
    )
    return { ok: true, response }
  } catch {
    return { ok: false }
  }
}
