export type verifyRefreshTokenPayload =
  | { success: true; token_jti: string; userId: string }
  | { success: false; code: string }

export type refreshTokenPayload =
  | { success: false; code: string }
  | { success: true; userId: string }
