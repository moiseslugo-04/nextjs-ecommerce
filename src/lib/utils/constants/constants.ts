export const AUTH_ROUTES = ['/auth']
export const PRIVATE_ROUTES = ['/dashboard', '/account', '/checkout']
export const ADMIN_ROUTES = ['/dashboard']
export const ERROR_MESSAGE = {
  USER_NOT_FOUND: { message: 'User not Found', code: 'USER_NOT_FOUND' },
  EMAIL_TAKEN: { message: 'Email already registered', code: 'EMAIL_TAKEN' },
  USER_CREATED: {
    message: 'User created successfully',
    code: 'USER_CREATED',
  },
  VALIDATION_FAILED: {
    message: 'Validation failed',
    code: 'VALIDATION_FAILED',
  },
  INTERNAL: { message: 'Internal server error', code: 'INTERNAL_ERROR' },
} as const
