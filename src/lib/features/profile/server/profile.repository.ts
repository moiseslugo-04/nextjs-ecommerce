import prisma from '@lib/client'
import { ProfilePayload } from '../types'
export function getUserProfile(userId: string) {
  return prisma.profile.findFirst({
    where: { userId },
    select: {
      userId: true,
      addresses: true,
      fullName: true,
      avatar: true,
      phone: true,
      country: true,
      city: true,
      postalCode: true,
      birthdate: true,
      user: {
        select: {
          name: true,
          createdAt: true,
          username: true,
          email: true,
          role: true,
        },
      },
    },
  })
}

export function saveProfile(profile: ProfilePayload) {
  return prisma.profile.create({ data: profile })
}
