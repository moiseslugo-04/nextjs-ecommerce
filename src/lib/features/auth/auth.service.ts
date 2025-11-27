import { saveRefreshToken } from '@features/refreshToken/refresh-token.repository'
import {
  createAccessToken,
  createRefreshToken,
} from '@features/jwt/jwt.service'
import { v4 as uuidv4 } from 'uuid'
import { loginSchema, registerSchema } from '@/schemas/user'
import {
  saveUser,
  findUserByIdentifier,
  updateUserPassword,
} from '@lib/features/users/user.repository'
import bcrypt from 'bcryptjs'
import { ERROR_MESSAGE } from '@/lib/utils/constants'
import { generateEmailVerificationToken } from '@/lib/features/userVerificationServices/user-verification.service'
import { Prisma } from '@prisma/client'

/* Login services */

export async function login(formData: FormData) {
  const data = Object.fromEntries(formData)
  const result = loginSchema.safeParse(data)
  if (!result.success)
    return {
      success: false,
      error: 'Invalid data type',
      code: 'INVALID_DATA',
    }
  const jti = uuidv4()
  const { password, identifier } = result.data
  const user = await findUserByIdentifier(identifier)
  if (!user) {
    return {
      success: false,
      error: ERROR_MESSAGE.USER_NOT_FOUND.message,
      code: ERROR_MESSAGE.USER_NOT_FOUND.code,
    }
  }

  //Valid Password
  const matchPassword = await bcrypt.compare(password, user.password)
  if (!matchPassword) {
    return { success: false, error: 'Invalid Credentials', code: 'lola' }
  }
  //Check if the email is verified
  if (!user.emailVerified) {
    return { success: false, warning: 'Email not verified' }
  }

  // Create token and refreshToken
  const { id, email, role } = user
  const accessToken = createAccessToken({
    userId: id.toString(),
    email,
    role,
  })
  const refreshToken = createRefreshToken({
    userId: id.toString(),
    jti,
  })
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 7)
  const { password: _password, ...userData } = user
  //save in db
  saveRefreshToken({
    userId: user.id,
    token: refreshToken,
    jti,
    expiresAt,
  })

  return { success: true, data: { refreshToken, accessToken, user: userData } }
}

/* Register services */
export async function registerUser(data: FormData) {
  const rawData = Object.fromEntries(data) as Record<string, string>
  const result = registerSchema.safeParse(rawData)
  if (!result.success)
    return { success: false, error: result.error.issues.flat() }
  const { password, confirmPassword, ...userData } = result.data
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const user = await saveUser({ ...userData, password: hashedPassword })
    if (user) {
      await generateEmailVerificationToken(user.email)
    }
    return { success: true, data: user }
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = Array.isArray(error.meta?.target)
          ? error.meta?.target[0] // safe access
          : String(error.meta?.target ?? 'unknown')

        return {
          success: false,
          error: 'Unique constraint failed',
          field: target,
        }
      }
    }

    return { success: false, error: 'Unexpected error' }
  }
}

export async function resetPassword(password: string, userId: number) {
  const hashedPassword = await bcrypt.hash(password, 12)
  await updateUserPassword(hashedPassword, userId)
  return { success: true }
}
