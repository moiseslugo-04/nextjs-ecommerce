import { useSession } from '@/lib/features/auth/client/hooks/useSession'
import { useCartSync } from '@/lib/features/cart/client/hooks/useCartSync'
import { ReactNode } from 'react'

export function AuthGate({ children }: { children: ReactNode }) {
  const { data: session, isLoading } = useSession()
  const isAuthenticated = !!session?.isAuthenticated
  useCartSync({
    enabled: isAuthenticated && !isLoading,
  })

  return <>{children}</>
}
