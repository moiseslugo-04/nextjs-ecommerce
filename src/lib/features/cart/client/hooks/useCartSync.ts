import { useCartStore } from '@features/cart/client/useCartStore'
import { syncCartAction } from '@features/cart/server/cart.actions'
import { useSession } from '@features/auth/client/hooks/useSession'
import { useEffect, useRef } from 'react'

export function useCartSync() {
  const { setCartFromDB } = useCartStore()
  const { data: session, isLoading } = useSession()
  const isSyncingRef = useRef(false)

  useEffect(() => {
    if (isLoading || !session || isSyncingRef.current) return

    const sync = async () => {
      isSyncingRef.current = true

      try {
        const localCart = useCartStore.getState().cart
        const res = await syncCartAction(localCart)

        if (res?.success && res.cart) {
          console.log(res.cart)
          setCartFromDB(res.cart)
        }
      } catch (error) {
        console.error('Cart sync error:', error)
      } finally {
        isSyncingRef.current = false
      }
    }

    sync()
  }, [isLoading, session, setCartFromDB])
}
