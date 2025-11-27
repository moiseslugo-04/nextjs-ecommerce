import { loginSchema, registerSchema } from '@/schemas/user'
import {
  saveUser,
  findUserByIdentifier,
  updateUserPassword,
  UserDTO,
} from '@lib/features/users/user.repository'
import { ERROR_MESSAGE } from '@/lib/utils/constants'
import { generateEmailVerificationToken } from '@/lib/features/userVerificationServices/user-verification.service'
import { Prisma } from '@prisma/client'
import { compareHashText, hashText } from '@/lib/utils/utils'
import { generateRefreshToken } from '@features/refreshToken/refresh-token.service'
import { createAccessToken } from '@features/jwt/jwt.service'
import { ActionsResponse, ServicesResponsePromise } from '@/types'

export async function login(formData: FormData): ServicesResponsePromise<{
  refreshToken: string
  accessToken: string
  refreshTokenJti: string
  user: UserDTO
} | null> {
  const data = Object.fromEntries(formData)
  //check and validated data
  const result = loginSchema.safeParse(data)
  if (!result.success)
    return { success: false, error: 'Invalid data type', code: 'INVALID_DATA' }

  //validate credentials
  const { password, identifier } = result.data
  const user = await findUserByIdentifier(identifier)

  //if user not found throw and Error
  if (!user) {
    return {
      success: false,
      message: ERROR_MESSAGE.USER_CREATED.message,
      code: ERROR_MESSAGE.USER_NOT_FOUND.code,
      action: ActionsResponse.CREATE_ACCOUNT,
    }
  }
  //if the password is null
  if (!user.password) {
    return {
      success: false,
      message: 'This user does not have an assigned password.',
      code: 'NO_PASSWORD',
      action: ActionsResponse.SET_PASSWORD,
    }
  }
  // verify if the password match
  const matchPassword = await compareHashText(password, user.password)
  if (!matchPassword) {
    return {
      success: false,
      error: 'Password or email are incorrect.',
      code: 'INVALID_CREDENTIALS',
    }
  }
  //Check if the email is verified
  if (!user.emailVerified) {
    return {
      success: false,
      code: 'NO_EMAIL_VERIFY',
      action: ActionsResponse.VERIFY_EMAIL,
      error: 'Please verify your email before logging in.',
    }
  }

  //Create access and refresh token
  const { id, email, role } = user
  const accessToken = createAccessToken({ id, email, role })
  const { payload } = await generateRefreshToken(id)
  //Return user without password
  const { password: _password, ...userData } = user
  return {
    success: true,
    data: {
      refreshToken: payload.refresh,
      refreshTokenJti: payload.refreshJti,
      accessToken,
      user: userData,
    },
  }
}

/* Register services */
export async function registerUser(data: FormData) {
  //Parse and validated data
  const rawData = Object.fromEntries(data) as Record<string, string>
  const result = registerSchema.safeParse(rawData)
  if (!result.success)
    return { success: false, error: result.error.issues.flat() }

  // hash password and omit the confirm password
  const { confirmPassword, password, ...userData } = result.data
  const hashedPassword = await hashText(password)

  try {
    //save user
    const user = await saveUser({ ...userData, password: hashedPassword })
    if (user) await generateEmailVerificationToken(user.email)
    return { success: true, data: user }
  } catch (error: unknown) {
    //if the email is already exists
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Email is already taken please, Login or change the email',
          action: ActionsResponse.LOGIN,
        }
      }
    }

    return { success: false, error: 'Unexpected error' }
  }
}

export async function setPassword(userId: string, password: string) {
  const hashedPassword = await hashText(password)
  await updateUserPassword(hashedPassword, userId)
  return {
    success: true,
  }
}
