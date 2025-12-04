import { PrismaAdapter } from '@auth/prisma-adapter'
import type { AdapterUser } from '@auth/core/adapters'
import prisma from './client'

export function CustomAdapter(p = prisma) {
  const original = PrismaAdapter(p)

  return {
    ...original,
    async createUser(data: AdapterUser) {
      console.log(data, 'server adapter')
      if (!original.createUser) throw new Error('Adapter missing createUser')
      return original.createUser({
        ...data,
        emailVerified: new Date(),
      })
    },
  }
}
