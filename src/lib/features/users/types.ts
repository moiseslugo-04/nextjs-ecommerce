import {
  RefreshToken,
  Role,
  VerificationToken,
  Account,
  Profile,
} from '@prisma/client'

export type UserDTO = {
  id: string
  email: string
  emailVerified: Date | null
  role: Role
  username: string | null
  name?: string
  verificationTokens: VerificationToken[]
  refreshTokens: RefreshToken[]
  accounts: Account[]
  profile: Profile | null
}

export interface SaveUser {
  name: string
  email: string
  username?: string
  password?: string
  image?: string
  emailVerified?: Date
}
