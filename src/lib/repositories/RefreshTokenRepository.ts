import prisma from '@lib/client'
interface CreateToken {
  userId: number
  token: string
  expiresAt: Date
}
class RefreshTokenRepository {
  async create({ userId, token, expiresAt }: CreateToken) {
    return prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    })
  }
  async finByToken(refresh: string) {
    return prisma.refreshToken.findFirst({
      where: { token: refresh },
      include: { user: true },
    })
  }
  async deleteById(id: number) {
    return prisma.refreshToken.delete({ where: { id } })
  }
  async deleteExpired() {
    return prisma.refreshToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    })
  }
  async deleteByToken(token: string) {
    return prisma.refreshToken.delete({ where: { token } })
  }
}

export const refreshTokenRepository = new RefreshTokenRepository()
