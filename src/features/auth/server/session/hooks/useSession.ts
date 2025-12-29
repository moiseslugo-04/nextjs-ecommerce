'use client'
import { getSessionAction } from '@/features/auth/server/auth.action'
import { useEffect, useState } from 'react'
import { SessionPayload } from '../types'
export function useSession(): { session: SessionPayload; isLoading: boolean } {
  const [session, setSession] = useState<SessionPayload>({
    isAuthenticated: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSessionAction()
      .then(setSession)
      .finally(() => setIsLoading(false))
  }, [])

  return {
    session,
    isLoading,
  }
}
