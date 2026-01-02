// TODO :improve this message

export const ACTION_MESSAGES = {
  CREATE_ACCOUNT: {
    title: "You don't have an account",
    description: 'Would you like to create one now?',
    route: '/auth/identify',
  },
  SET_PASSWORD: {
    title: 'Password missing',
    description: 'Please set one to continue.',
    route: '/auth/set-password/invalid-token',
  },
  VERIFY_EMAIL: {
    title: 'Verify your email',
    description: 'We sent a verification link to your inbox.',
    route: '/auth/verify/email',
  },
  LOGIN: {
    title: 'Account found',
    description: 'Continue to login.',
    route: '/auth/login',
  },
} as const
