'use client'
import { useCartSync } from '@/lib/features/cart/client/hooks/useCartSync'
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
      <CartSyncGate>{children}</CartSyncGate>
    </QueryClientProvider>
  )
}
function CartSyncGate({ children }: { children: ReactNode }) {
  useCartSync()
  return <>{children}</>
}
