import prisma from '@/lib/client'
import { RegisterSchema } from '@/schemas/user'
import { RefreshToken, Role, VerificationToken } from '@prisma/client'

export type UserDTO = {
  id: number
  username: string
  name: string
  email: string
  emailVerified: boolean
  role: Role
  refreshTokens: RefreshToken[]
  verificationTokens: VerificationToken[]
}
export type UserDTOWithPassword = UserDTO & { password: string }
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
    },
  })
}

export function findUserByIdentifier(
  identifier: string
): Promise<UserDTOWithPassword | null> {
  return prisma.user.findFirst({
    where: { OR: [{ username: identifier }, { email: identifier }] },
    select: {
      username: true,
      name: true,
      email: true,
      emailVerified: true,
      role: true,
      refreshTokens: true,
      verificationTokens: true,
      id: true,
      password: true,
    },
  })
}

export function updateVerifiedEmail(id: number) {
  return prisma.user.update({
    where: { id },
    data: {
      emailVerified: true,
    },
  })
}

export function saveUser(
  data: Omit<RegisterSchema, 'confirmPassword'>
): Promise<UserDTO | null> {
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
      id: true,
    },
  })
}

export function updateUserPassword(password: string, id: number) {
  return prisma.user.update({ where: { id }, data: { password } })
}
export function deleteUserById(id: number) {
  return prisma.user.delete({ where: { id } })
}

export function findUserById(id: number) {
  return prisma.user.findFirst({ where: { id } })
}
