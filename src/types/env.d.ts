declare namespace NodeJS {
  interface ProcessEnv {
    JWT_ACCESS_SECRET: string
    JWT_REFRESH_SECRET: string
    DATABASE_URL: string
    AUTH_SECRET: string
    NEXT_AUTH_URL: string
    RESEND_API_KEY: string

    //Frontend safe
    NEXT_PUBLIC_APP_URL: string
  }
}
