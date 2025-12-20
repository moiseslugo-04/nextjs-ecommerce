'use client'

<<<<<<< HEAD
import { AuthGate } from '@/lib/features/auth/client/AuthGate'
=======
import { SessionSyncGate } from '@/lib/features/auth/client/SessionSyncGate'
>>>>>>> 3113f24 (WIP:Account page)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
export function SessionSynchronizer({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <AuthGate>{children}</AuthGate>
=======
      <SessionSyncGate>{children}</SessionSyncGate>
>>>>>>> 3113f24 (WIP:Account page)
    </QueryClientProvider>
  )
}
