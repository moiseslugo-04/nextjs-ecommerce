export interface TokenInput {
  type: 'email_verification' | 'reset_password' | 'set_password'
  identifier?: string
  expiresInHours: number
  userId: string
}

export type VerificationTokenTypes =
  | 'email_verification'
  | 'reset_password'
  | 'set_password'
