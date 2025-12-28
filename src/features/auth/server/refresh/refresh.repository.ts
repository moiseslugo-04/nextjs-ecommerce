import prisma from '@lib/client'
interface CreateToken {
  userId: string
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
export async function revokeRefreshToken(jti: string) {
  return prisma.refreshToken.update({ where: { jti }, data: { revoked: true } })
}

export async function findRefreshTokenByToken(refresh: string) {
  return prisma.refreshToken.findFirst({
    where: { token: refresh },
    include: { user: true },
  })
}
export async function findRefreshTokenByJti(jti: string) {
  return prisma.refreshToken.findUnique({ where: { jti } })
}

export async function deleteRefreshTokenByJti(jti: string) {
  return prisma.refreshToken.delete({ where: { jti } })
}

export async function deleteAllRefreshTokenTokensForUser(userId: string) {
  return prisma.refreshToken.deleteMany({ where: { userId } })
}
export async function deleteExpiredRefreshTokens() {
  return prisma.refreshToken.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  })
}
