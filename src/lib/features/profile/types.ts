import { Role } from '@prisma/client'
export type SessionProvider = 'google' | 'credentials'

export type ProfileWithRelations = {
  user: {
    name: string
    createdAt: Date
    username: string | null
    email: string | null
  }
  userId: string
  avatar: string | null
  fullName: string | null
  phone: string | null
  address: string | null
  country: string | null
  city: string | null
  postalCode: string | null
  birthdate: Date | null
} | null
export type SessionState =
  | { isAuthenticated: false }
  | {
      isAuthenticated: true
      provider: SessionProvider
      user: { email: string; id: string }
      role: Role
      profile: ProfileWithRelations
    }

export interface ProfilePayload {
  userId: string
  avatar?: string | null
  fullName?: string | null
  phone?: string | null
  address?: string | null
  country?: string | null
  city?: string | null
  postalCode?: string | null
  birthdate?: Date | null
}
