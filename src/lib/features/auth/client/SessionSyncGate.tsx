<<<<<<< HEAD:src/lib/features/auth/client/AuthGate.tsx
import { useSession } from '@features/auth/server/session/client/useSession'
import { useCartSync } from '@features/cart/client/useCartSync'
=======
import { useSession } from '@/lib/features/auth/server/session/client/useSession'
import { useCartSync } from '@features/cart/client/hooks/useCartSync'
>>>>>>> 3113f24 (WIP:Account page):src/lib/features/auth/client/SessionSyncGate.tsx
import { ReactNode } from 'react'

export function SessionSyncGate({ children }: { children: ReactNode }) {
  const { data: session, isLoading } = useSession()
  const isAuthenticated = !!session?.isAuthenticated
  useCartSync({
    enabled: isAuthenticated && !isLoading,
  })

  return <>{children}</>
}
