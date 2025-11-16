import { create } from 'zustand'

type User = { identifier: string | null; password: string | null }

type AuthSate = {
  isAuthenticated: boolean
  token: string | null
  error: string | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthSate>((set) => ({
  user: null,
  token: null,
  error: null,
  isAuthenticated: false,
  login: ({ identifier, password }) => {
    try {
      if (identifier === 'admin' && password === '123456') {
        set({ token: 'token', isAuthenticated: true })
        return
      }
      throw new Error('Invalid credentials')
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      set({ error: errorMessage, isAuthenticated: false, token: null })
      throw error
    }
  },
  logout: () => set({ token: null, isAuthenticated: false }),
}))
