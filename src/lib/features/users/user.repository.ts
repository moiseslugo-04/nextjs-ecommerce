import prisma from '@/lib/client'
import { UserDTO, SaveUser } from './types'

export type UserDTOWithPassword = UserDTO & { password: string | null }
export function findUserByEmail(email: string): Promise<UserDTO | null> {
  return prisma.user.findFirst({
    where: { email },
    select: {
      username: true,
      name: true,
      email: true,
      emailVerified: true,
      role: true,
      refreshTokens: true,
      verificationTokens: true,
      id: true,
      accounts: true,
      profile: true,
    },
  })
}

export function findUserByIdentifier(
  identifier: string
): Promise<UserDTOWithPassword | null> {
  return prisma.user.findFirst({
    where: { email: identifier },
    select: {
      username: true,
      name: true,
      email: true,
      emailVerified: true,
      role: true,
      refreshTokens: true,
      verificationTokens: true,
      accounts: true,
      id: true,
      password: true,
      profile: true,
    },
  })
}

export function updateVerifiedEmail(id: string) {
  return prisma.user.update({
    where: { id },
    data: { emailVerified: new Date() },
  })
}

export function saveUser(data: SaveUser): Promise<UserDTO | null> {
  return prisma.user.create({
    data: {
      ...data,
    },
    select: {
      username: true,
      name: true,
      email: true,
      emailVerified: true,
      role: true,
      refreshTokens: true,
      verificationTokens: true,
      accounts: true,
      id: true,
      profile: true,
    },
  })
}

export function updateUserPassword(password: string, id: string) {
  return prisma.user.update({ where: { id }, data: { password } })
}
export function deleteUserById(id: string) {
  return prisma.user.delete({ where: { id } })
}

export function findUserById(id: string) {
  return prisma.user.findFirst({ where: { id }, include: { profile: true } })
}
