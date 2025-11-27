import prisma from '@/lib/client'
import { Account } from '@prisma/client'

export async function findByProvider(
  provider: string,
  providerAccountId: string
) {
  return prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
  })
}

export function saveAccount(
  data: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>
) {
  return prisma.account.create({ data })
}

export function updateTokens(
  provider: string,
  providerAccountId: string,
  tokens: {
    accessToken?: string | null
    refreshToken?: string | null
    expiresAt?: number | null
    idToken?: string | null
    accessTokenExpiresAt?: number | null
    refreshTokenExpiresAt?: number | null
  }
) {
  return prisma.account.update({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
    data: tokens,
  })
}
