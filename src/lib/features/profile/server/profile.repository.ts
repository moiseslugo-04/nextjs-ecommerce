import prisma from '@lib/client'
import { ProfileData, ProfilePayload } from '../types'
import { ProfileInput, ProfileOutput } from '../schemas'
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
          image: true,
        },
      },
    },
  })
}

export function saveProfile(profile: ProfilePayload) {
  return prisma.profile.create({ data: profile })
}

export async function updateUserProfile(userId: string, data: ProfileData) {
  return prisma.$transaction(async (tx) => {
    const profile = await tx.profile.update({
      where: { userId },
      data: {
        fullName: data.fullname,
        phone: data.phone,
        birthdate: data.birthdate as Date,
        avatar: data.avatar,
      },
    })

    const user = await tx.user.update({
      where: { id: userId },
      data: {
        name: data.fullname,
        image: data.avatar,
        username: data.username,
      },
    })

    return { profile, user }
  })
}
