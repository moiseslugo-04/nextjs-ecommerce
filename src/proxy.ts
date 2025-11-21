import { NextRequest, NextResponse } from 'next/server'
import { generateToken, verifyToken } from './lib/utils/token'
import 'dotenv'
import { refreshTokenRepository } from './lib/repositories/RefreshTokenRepository'

const protectedRoutes = ['/dashboard', '/profile', '/payment', '/orders']
// const authRoutes = ['/auth/login', '/auth/register']

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const isProtectedRoute = checkProtectedRoute(pathname)
  //  const isAuthRoute = checkAuthRoute(pathname)

  // If it's not a protected route, continue.
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  const accessToken = req.cookies.get('access_token')?.value
  const refreshToken = req.cookies.get('refresh_token')?.value

  // Caso 1: Access token válido
  if (accessToken) {
    try {
      const payload = verifyToken(accessToken)

      // Agregar headers con info del usuario
      const headers = new Headers(req.headers)
      headers.set('x-user-id', payload.userId.toString())
      headers.set('x-user-role', payload.role)

      return NextResponse.next({ headers })
    } catch (error) {
      console.log(error)
      console.log('Access token expired, trying to renew...')
      // Continue to the refresh token case
    }
  }

  // Refresh valid token
  if (refreshToken) {
    try {
      const storedToken = await refreshTokenRepository.finByToken(refreshToken)

      if (!storedToken) {
        throw new Error('Refresh token not found')
      }

      if (storedToken.expiresAt < new Date()) {
        await refreshTokenRepository.deleteById(storedToken.id)
        throw new Error('Refresh token expired')
      }

      // Generate new access token
      const newAccessToken = generateToken({
        id: storedToken.userId,
        email: storedToken.user.email,
        role: storedToken.user.role,
      })

      //Create response
      const headers = new Headers(req.headers)
      headers.set('x-user-id', storedToken.userId.toString())
      headers.set('x-user-role', storedToken.user.role)

      const response = NextResponse.next({ headers })

      //Set new access token
      response.cookies.set('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hora
        path: '/',
      })

      return response
    } catch (error) {
      console.log(error)
      console.log('Refresh token invalid, redirecting to login')
      // Clear cookies and redirect
      const response = NextResponse.redirect(new URL('/auth/login', req.url))
      response.cookies.delete('access_token')
      response.cookies.delete('refresh_token')
      response.cookies.delete('is_authenticated')
      return response
    }
  }

  // Case 3: No valid tokens - redirect to login
  const loginUrl = new URL('/auth/login', req.url)
  loginUrl.searchParams.set('callbackUrl', req.url)
  return NextResponse.redirect(loginUrl)
}

function checkProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

/* function checkAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.startsWith(route))
} */

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
