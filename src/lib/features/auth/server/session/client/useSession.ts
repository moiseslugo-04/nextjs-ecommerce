'use client'

import { useQuery } from '@tanstack/react-query'
import { getSessionAction } from '@features/auth/server/auth.action'
export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSessionAction,
    refetchInterval: 13 * 60 * 1000,
  })
}
