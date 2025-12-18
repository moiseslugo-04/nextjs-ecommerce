import { cookies } from 'next/headers'
interface CookiesPayload {
  name: string
  value: string
  options: {
    maxAge: number
    path?: string
  }
}
export async function getCookies(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}
export async function setCookies({ name, value, options }: CookiesPayload) {
  const cookieStore = await cookies()
  cookieStore.set(name, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    ...options,
  })
}

export async function deleteCookies(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}
export async function deleteManyCookies(names: string[]) {
  const cookieStore = await cookies()
  names.forEach((name) => cookieStore.delete(name))
}
