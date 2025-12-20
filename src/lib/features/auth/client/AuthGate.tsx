import { useSession } from '@features/auth/server/session/client/useSession'
import { useCartSync } from '@features/cart/client/useCartSync'
import { ReactNode } from 'react'

export function AuthGate({ children }: { children: ReactNode }) {
  const { data: session, isLoading } = useSession()
  const isAuthenticated = !!session?.isAuthenticated
  useCartSync({
    enabled: isAuthenticated && !isLoading,
  })

  return <>{children}</>
}
