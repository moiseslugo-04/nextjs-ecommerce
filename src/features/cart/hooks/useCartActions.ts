'use client'
import {
  incrementQuantityAction,
  decrementQuantityAction,
  removeCartItemAction,
  addToCartAction,
} from '../cart.actions'
import { toast } from 'sonner'
import { useState } from 'react'
import { useCartStore } from './useCartStore'
import { CartItemType, ActionPayload } from '../types'
import { SerializedProduct } from '@features/products/types'
import { useSession } from '@/features/auth/server/session/hooks/useSession'
export function useCartActions() {
  const {
    session: { isAuthenticated },
  } = useSession()
  const { increment, decrement, removeItem, addItem } = useCartStore()
  const [pendingId, setPendingId] = useState<number | null>(null)

  // Add to cart
  const onAddToCart = async (item: SerializedProduct) => {
    addItem({ ...item, quantity: 1, isGuest: !isAuthenticated })
    toast.success(`${item.name} was added with success`)
    if (!isAuthenticated) return
    try {
      const response = await addToCartAction(item.id)
      if (!response.success) throw new Error()
    } catch {
      removeItem(item.id)
      toast.error('Error trying add Product in the cart')
    }
  }
  //Increase Quantity
  const onIncrease = async (item: ActionPayload) => {
    increment(item.id)
    toast.success(`${item.name} quantity updated`)

    if (!isAuthenticated) return
    try {
      const res = await incrementQuantityAction(item.id)
      if (!res.success) throw new Error()
    } catch {
      decrement(item.id)
      toast.error('Error trying increase quantity')
    }
  }
  //Decrease Quantity
  const onDecrease = async (item: ActionPayload) => {
    decrement(item.id)
    toast.success(`${item.name} quantity updated`)
    if (!isAuthenticated) return
    try {
      const res = await decrementQuantityAction(item.id)
      if (!res.success) throw new Error()
    } catch {
      increment(item.id)
      toast.error('Error trying decrease quantity')
    }
  }
  //Remove  Item
  const onRemove = async (item: CartItemType) => {
    const backup = item
    removeItem(item.id)
    toast.success(`${item.name} removed from cart`)
    if (!isAuthenticated) return
    try {
      const res = await removeCartItemAction(item.id)
      if (!res.success) throw new Error()
    } catch {
      addItem(backup)
      toast.error('Failed to remove item')
    }
  }

  return { onRemove, onIncrease, onDecrease, onAddToCart, pendingId }
}
