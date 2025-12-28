'use client'

import { useCartStore } from '@/features/cart/hooks/useCartStore'
import { logout } from '@/features/auth/server/auth.action'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function useLogout() {
  const [isPending, startTransition] = useTransition()
  const { clearCart } = useCartStore()
  const closeSession = async () => {
    localStorage.removeItem('cart_storage')
    clearCart()
    startTransition(async () => {
      toast('Session closed')
      await logout()
    })
  }
  return { closeSession, isPending }
}
