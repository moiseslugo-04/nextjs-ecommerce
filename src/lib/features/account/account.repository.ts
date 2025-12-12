import prisma from '@lib/client'
import { GoogleAccountPayload } from './types/types'
export function saveAccount(data: GoogleAccountPayload) {
  return prisma.account.create({ data })
}

export function getAccountByUserId(userId: string) {
  return prisma.account.findFirst({
    where: {
      provider: 'google',
      userId,
    },
  })
}
