import { userRepository } from '@/lib/repositories/UserRepository'
import { registerSchema, RegisterSchema } from '@/schemas/user'
import bcrypt from 'bcryptjs'
import { sendVerificationEmailAction } from '../actions/resend/sendVerificationEmailAction'
export class UserServices {
  async findUserByIdentifier(identifier: string) {
    return userRepository.findByIdentifier(identifier)
  }
  async verifyPassword({
    input,
    password,
  }: {
    input: string
    password: string
  }) {
    return bcrypt.compare(input, password)
  }

  async createUser(data: Omit<RegisterSchema, 'confirmPassword'>) {
    const result = registerSchema.safeParse(data)
    if (!result.success) {
      return { success: false, error: result.error.issues }
    }
    const { password, email, username, name } = result.data
    const [emailExists, usernameExists] = await Promise.all([
      userRepository.findByEmail(email),
      userRepository.findByUsername(username),
    ])
    if (emailExists || usernameExists) {
      return { success: false, error: 'Email or username already registered' }
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await userRepository.createUser({
      name,
      email,
      username,
      password: hashedPassword,
    })
    await sendVerificationEmailAction(email)
    return { success: true, user }
  }
  async findByEmail(email: string) {
    return userRepository.findByEmail(email)
  }
}

export const userServices = new UserServices()
