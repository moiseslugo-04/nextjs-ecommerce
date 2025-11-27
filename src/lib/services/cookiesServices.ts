import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
interface CookiesPayload {
  response: NextResponse
  name: string
  value: string
  options?: {
    maxAge?: number
    path?: string
  }
}
export async function getCookies(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value || null
}
export function setCookies({ response, name, value, options }: CookiesPayload) {
  response.cookies.set(name, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    ...options,
  })
}
export function deleteCookies(response: NextResponse, name: string) {
  response.cookies.delete(name)
}
export function deleteManyCookies(response: NextResponse, names: string[]) {
  names.forEach((name) => {
    response.cookies.delete(name)
  })
  return response
}
