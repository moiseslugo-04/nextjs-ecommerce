import { RegisterSchema } from '@/schemas/user'
import prisma from '@lib/client'
export class UserRepository {
  async findByIdentifier(identifier: string) {
    return prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        password: true,
      },
    })
  }
  async createUser({
    name,
    username,
    email,
    password,
  }: Omit<RegisterSchema, 'confirmPassword'>) {
    return prisma.user.create({
      data: { name, username, email, password },
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
      },
    })
  }
  async findByUsername(username: string) {
    return prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
      },
    })
  }
  async markEmailAsVerified(userId: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    })
  }
  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } })
  }
  async updatePassword(userId: number, hashedPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })
  }
}

export const userRepository = new UserRepository()
