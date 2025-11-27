export interface ServicesResponse<T = undefined> {
  success: boolean
  data?: T
  error?: string
  code?: string
  warning?: string
  message?: string
  meta?: Record<string, string>
}
export type ServicesResponsePromise<T> = Promise<ServicesResponse<T>>

export interface User {
  id: string
  name: string
  identifier: string
}

export type LinkType = { href: string; label: string }
