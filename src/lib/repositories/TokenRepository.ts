import prisma from '../client'
interface CreateTokenProps {
  identifier: string
  value: string
  expiresAt: Date
  userId: number
}
class TokenRepository {
  async createToken({
    identifier,
    value,
    expiresAt,
    userId,
  }: CreateTokenProps) {
    return prisma.verificationToken.create({
      data: {
        userId,
        identifier,
        value,
        expiresAt,
        createdAt: new Date(),
      },
    })
  }
  async findIdentifier(identifier: string) {
    return prisma.verificationToken.findFirst({ where: { identifier } })
  }
  async findByToken(token: string) {
    return prisma.verificationToken.findFirst({ where: { value: token } })
  }
  async getUserTokenByType(userId: number, identifier: string) {
    return prisma.verificationToken.findFirst({
      where: { userId, identifier },
    })
  }
  async deleteTokenByIdentifier(userId: number, identifier: string) {
    return prisma.verificationToken.deleteMany({
      where: {
        userId,
        identifier,
      },
    })
  }
  async deleteById(id: number) {
    return prisma.verificationToken.delete({ where: { id } })
  }
  async deleteExpired() {
    return prisma.verificationToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    })
  }
  async delete(token: string) {
    return prisma.verificationToken.delete({ where: { value: token } })
  }
}
export const tokenRepository = new TokenRepository()
