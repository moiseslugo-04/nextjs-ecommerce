import prisma from '@lib/client'
interface CreateToken {
  userId: number
  token: string
  expiresAt: Date
  jti: string
}

export async function saveRefreshToken({
  jti,
  userId,
  token,
  expiresAt,
}: CreateToken) {
  return prisma.refreshToken.create({
    data: {
      jti,
      userId,
      token,
      expiresAt,
    },
  })
}

export async function findByToken(refresh: string) {
  return prisma.refreshToken.findFirst({
    where: { token: refresh },
    include: { user: true },
  })
}
export async function findByJti(jti: string) {
  return prisma.refreshToken.findFirst({ where: { jti } })
}

export async function deleteByJti(jti: string) {
  return prisma.refreshToken.delete({ where: { jti } })
}
export async function deleteByToken(token: string) {
  return prisma.refreshToken.delete({ where: { token } })
}
export async function deleteAllTokensForUser(userId: number) {
  return prisma.refreshToken.deleteMany({ where: { userId } })
}
export async function deleteExpiredTokens() {
  return prisma.refreshToken.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  })
}
