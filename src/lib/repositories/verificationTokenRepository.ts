import prisma from '../client'
interface CreateTokenProps {
  identifier: string
  value: string
  expiresAt: Date
}
class VerificationTokenRepository {
  async createToken({ identifier, value, expiresAt }: CreateTokenProps) {
    return prisma.verificationToken.create({
      data: {
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
}
export const verificationTokenRepository = new VerificationTokenRepository()
