import prisma from '@lib/client'
interface CreateTokenProps {
  token: string
  expiresAt: Date
  userId: string
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
export async function getVerificationToken(token: string) {
  return prisma.verificationToken.findFirst({ where: { token } })
}
export async function getUserTokenByIdentifier(
  userId: string,
  identifier: string
) {
  return prisma.verificationToken.findFirst({
    where: { userId, identifier },
  })
}
export async function deleteExistingTokes(userId: string, type: string) {
  return prisma.verificationToken.deleteMany({
    where: {
      userId,
      type,
    },
  })
}
export async function deleteExpired() {
  return prisma.verificationToken.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  })
}
export async function deleteVerificationToken(token: string) {
  return prisma.verificationToken.deleteMany({ where: { token } })
}
