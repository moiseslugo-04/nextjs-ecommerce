import { Address, Role } from '@prisma/client'
import { ProfileInput } from './schemas'
export type SessionProvider = 'google' | 'credentials'

export type ProfileDTO = {
  name: string
  createdAt: Date
  username: string | null
  email: string | null
  addresses: Address[]
  role: Role
  userId: string
  avatar: string | null
  fullName: string | null
  phone: string | null
  birthdate: Date | null
} | null

export type SessionState =
  | { isAuthenticated: false }
  | {
      isAuthenticated: true
      provider: SessionProvider
      user: { email: string; id: string }
      role: Role
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

export type ProfileData = Pick<
  ProfileInput,
  'username' | 'birthdate' | 'fullname' | 'phone'
> & { avatar?: string }
