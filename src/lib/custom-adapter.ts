import { PrismaAdapter } from '@auth/prisma-adapter'
import type { AdapterUser } from '@auth/core/adapters'
import prisma from './client'

export function CustomAdapter(p = prisma) {
  const original = PrismaAdapter(p)

  return {
    ...original,
    async createUser(data: AdapterUser) {
      if (!original.createUser) {
        throw new Error('Adapter missing createUser')
      }

      const user = await original.createUser({
        ...data,
        emailVerified: new Date(),
      })

      await p.profile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          avatar: user.image,
        },
      })

      return user
    },
  }
}
