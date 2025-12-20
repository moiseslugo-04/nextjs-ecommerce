import { create } from 'zustand'
import {
  ProfileWithRelations,
  SessionProvider,
} from '../../../../profile/types'
import { Role } from '@prisma/client'
type Session = {
  isAuthenticated: boolean
  provider: SessionProvider | undefined
  user?: { email: string; id: string }
  role?: Role | undefined
  profile?: ProfileWithRelations
}
type SessionStoreType = {
  setSession: (session: Session) => void
  clearSession: () => void
  setSessionReady: (isReady: boolean) => void
  sessionReady: boolean
} & Session
export const useSessionStore = create<SessionStoreType>((set) => ({
  isAuthenticated: false,
  provider: undefined,
  user: undefined,
  role: undefined,
  profile: undefined,
  sessionReady: false,
  setSessionReady: (isReady) => set({ sessionReady: isReady }),
  setSession: (session) => set(() => session),
  clearSession: () =>
    set(() => ({
      isAuthenticated: false,
      user: undefined,
      role: undefined,
      profile: undefined,
    })),
}))
