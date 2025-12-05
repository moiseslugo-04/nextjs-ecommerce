'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from '@/lib/features/auth/services/get-session.service'

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    refetchInterval: 13 * 60 * 1000,
  })
}
