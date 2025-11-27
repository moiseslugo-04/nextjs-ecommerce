type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  code?: string
  warning?: string
  message?: string
  action?: ActionsResponse
  meta?: Record<string, string>
}
export type ServicesResponsePromise<T> = Promise<ApiResponse<T>>
export type ApiResponsePromise<T> = Promise<ApiResponse<T>>
export interface User {
  id: string
  name: string
  identifier: string
}

export type LinkType = { href: string; label: string }
export enum ActionsResponse {
  'CREATE_ACCOUNT' = 'CREATE_ACCOUNT',
  'LOGIN' = 'LOGIN',
  'VERIFY_EMAIL' = 'VERIFY_EMAIL',
  'SET_PASSWORD' = 'SET_PASSWORD',
}
