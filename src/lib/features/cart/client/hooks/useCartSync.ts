'use client'
import { useEffect, useRef } from 'react'
import { useCartStore } from '../store/useCartStore'
import { syncCartAction } from '@features/cart/server/cart.actions'
import { useSession } from '@features/auth/server/session/client/useSession'

export function useCartSync({ enabled }: { enabled: boolean }) {
  const { data: session, isLoading } = useSession()
  const { setCartFromDB, setIsSync } = useCartStore()
  const isSyncingRef = useRef(false)
  useEffect(() => {
    if (
      isLoading ||
      !session?.isAuthenticated ||
      isSyncingRef.current ||
      !enabled
    )
      return

    const sync = async () => {
      setIsSync(true)
      isSyncingRef.current = true

      try {
        const localCart = useCartStore.getState().cart
        const res = await syncCartAction(localCart)

        if (res?.success && res.cart) {
          setCartFromDB(res.cart)
        }
      } catch (error) {
        console.error('Cart sync error:', error)
      } finally {
        isSyncingRef.current = false
        setIsSync(false)
      }
    }
    sync()
  }, [isLoading, session, setCartFromDB, setIsSync, enabled])
}
