import prisma from '@lib/client'
interface CreateTokenProps {
  token: string
  expiresAt: Date
  userId: number
  type: string
  identifier?: string
}

export async function saveVerificationToken({
  token,
  expiresAt,
  userId,
  type,
  identifier,
}: CreateTokenProps) {
  return prisma.verificationToken.create({
    data: {
      userId,
      type,
      identifier,
      token,
      expiresAt,
      createdAt: new Date(),
    },
  })
}

export async function findVerificationTokenByToken(token: string) {
  return prisma.verificationToken.findFirst({ where: { token } })
}
export async function getUserTokenByIdentifier(
  userId: number,
  identifier: string
) {
  return prisma.verificationToken.findFirst({
    where: { userId, identifier },
  })
}
export async function deleteVerificationTokenByUserId(
  userId: number,
  type: string
) {
  return prisma.verificationToken.deleteMany({
    where: {
      userId,
      type,
    },
  })
}
export async function deleteVerificationTokenById(id: number) {
  return prisma.verificationToken.delete({ where: { id } })
}
export async function deleteExpired() {
  return prisma.verificationToken.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  })
}
export async function deleteVerificationTokenByToken(token: string) {
  // INFO: to solve the error P2025 from prisma
  return prisma.verificationToken.deleteMany({ where: { token } })
}
