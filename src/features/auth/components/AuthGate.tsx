import { useSession } from '@/features/auth/server/session/hooks/useSession'
import { syncCartAction } from '@/features/cart/cart.actions'
import { useCartStore } from '@/features/cart/hooks/useCartStore'
import { ReactNode, useEffect, useRef } from 'react'

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, isLoading } = useSession()
  const { cart, setCartFromDB, setIsSync } = useCartStore()
  const hasSyncedRef = useRef(false)
  useEffect(() => {
    if (!session.isAuthenticated || isLoading || hasSyncedRef.current) return
    const syncCart = async () => {
      setIsSync(true)
      hasSyncedRef.current = true
      try {
        const res = await syncCartAction(cart)
        if (res.success && res.cart) setCartFromDB(res.cart)
      } catch {
        setIsSync(false)
      } finally {
        setIsSync(false)
      }
    }
    syncCart()
  }, [session.isAuthenticated, isLoading, cart, setCartFromDB, setIsSync])
  return <>{children}</>
}
