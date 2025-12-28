import { Role } from '@prisma/client'

export type AccessTokenPayload = {
  id: string
  email: string
  role: string
}
export type PayloadAccessToken = {
  id: string
  email: string
  role: Role
  exp: number
  iat: number
}
export interface SessionData {
  id: string
  email: string
  role: string
}
export type SessionPayload =
  | {
      isAuthenticated: true
      payload: {
        provider: 'credentials' | 'google'
        role: Role
        email: string
        id: string
      }
    }
  | { isAuthenticated: false }
