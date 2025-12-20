import prisma from '@lib/client'
import { ProfilePayload } from '../types'
export function getUserProfile(userId: string) {
  return prisma.profile.findUnique({
    where: { userId },
    select: {
      userId: true,
      avatar: true,
      fullName: true,
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
          addresses: true,
        },
      },
    },
  })
}

export function saveProfile(profile: ProfilePayload) {
  return prisma.profile.create({ data: profile })
}
