import { tokenRepository } from '@lib/repositories/TokenRepository'
import { generateVerificationToken } from '../utils/token'
interface CreateToken {
  type: 'email_verification' | 'reset_password'
  expiresInHours: number
  userId: number
}
export class TokenServices {
  async create({ userId, type, expiresInHours = 24 }: CreateToken) {
    const { value, expiresAt } = generateVerificationToken({
      expired: expiresInHours,
    })
    return tokenRepository.createToken({
      userId,
      identifier: type,
      value,
      expiresAt,
    })
  }

  async validate(token: string) {
    const record = await tokenRepository.findByToken(token)
    const currentDate = new Date()
    if (!record)
      return {
        success: false,
        token: null,
        error: 'Token not Found',
        expired: false,
      }
    if (record.expiresAt > currentDate) {
      return {
        success: false,
        token: record,
        error: 'Expired Token',
        expired: true,
      }
    }
    return {
      success: true,
      token: record,
      error: '',
      expired: false,
    }
  }
  async deleteByIdentifier(
    userId: number,
    identifier: 'email_verification' | 'reset_password'
  ) {
    return tokenRepository.deleteTokenByIdentifier(userId, identifier)
  }
  async delete(token: string) {
    return tokenRepository.delete(token)
  }
}

export const tokenServices = new TokenServices()
