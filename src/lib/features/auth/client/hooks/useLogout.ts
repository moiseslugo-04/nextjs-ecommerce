'use client'

import { useCartStore } from '@/lib/features/cart/client/useCartStore'
import { logout } from '@features/auth/logout'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function useLogout() {
  const [isPending, startTransition] = useTransition()
  const { clearCart } = useCartStore()
  const { replace } = useRouter()
  const closeSession = async () => {
    //Clear Cart
    localStorage.removeItem('cart_storage')
    clearCart()
    startTransition(async () => {
      await logout()
      toast('Session closed')
      replace('/auth/login')
    })
  }
  return { closeSession, isPending }
}
