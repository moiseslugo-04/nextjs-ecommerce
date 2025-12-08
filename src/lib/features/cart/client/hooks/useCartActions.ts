'use client'
import { useMutation } from '@tanstack/react-query'
import {
  incrementQuantityAction,
  decrementQuantityAction,
  removeCartItemAction,
  addToCartAction,
} from '@/lib/features/cart/server/cart.actions'
import { toast } from 'sonner'
import { useState } from 'react'
import { useCartStore } from '@/lib/features/cart/client/useCartStore'
import { CartItemType, ActionPayload } from '@features/cart/cart.types'
import { SerializedProduct } from '@/lib/features/products/product.types'
import { useSession } from '@features/auth/client/hooks/useSession'
export function useCartActions() {
  const isAuthenticated = !!useSession().data?.payload.role
  const { increment, decrement, removeItem, addItem } = useCartStore()
  const [pendingId, setPendingId] = useState<number | null>(null)

  const { mutateAsync: increaseMutation } = useMutation({
    mutationFn: incrementQuantityAction,
  })

  const { mutateAsync: decreaseMutation } = useMutation({
    mutationFn: decrementQuantityAction,
  })

  const { mutateAsync: removeMutation } = useMutation({
    mutationFn: removeCartItemAction,
  })
  const { mutateAsync: addToCartMutation } = useMutation({
    mutationFn: addToCartAction,
  })

  const onAddToCart = async (item: SerializedProduct) => {
    addItem({ ...item, quantity: 1, isGuest: !isAuthenticated })
    toast.success(`${item.name} was added with success`)

    if (isAuthenticated) {
      setPendingId(item.id)
      try {
        const response = await addToCartMutation(item.id)
        if (!response.success) {
          toast.error(`Error trying add ${item.name} in cart, Trying again`)
          //Rollback
          removeItem(item.id)
          return
        }
      } catch {
        removeItem(item.id)
        toast.error('Server error')
      } finally {
        setPendingId(null)
      }
    }
  }

  const onIncrease = async (item: ActionPayload) => {
    if (pendingId === item.id) return
    increment(item.id)
    toast.success(`${item.name} quantity updated`)
    if (isAuthenticated) {
      setPendingId(item.id)
      try {
        const res = await increaseMutation(item.id)
        if (!res.success) {
          decrement(item.id)
          toast.error('Failed to update')
        }
      } catch {
        decrement(item.id)
        toast.error('Server error')
      } finally {
        setPendingId(null)
      }
    }
  }

  const onDecrease = async (item: ActionPayload) => {
    if (pendingId === item.id) return
    decrement(item.id)
    toast.success(`${item.name} quantity updated`)
    if (isAuthenticated) {
      setPendingId(item.id)
      try {
        const res = await decreaseMutation(item.id)
        if (!res.success) {
          increment(item.id)
          toast.error('Failed to update')
        }
      } catch {
        increment(item.id)
        toast.error('Server error')
      } finally {
        setPendingId(null)
      }
    }
  }

  const onRemove = async (item: CartItemType) => {
    if (pendingId === item.id) return

    const backup = item
    removeItem(item.id)
    toast.success(`${item.name} removed from cart`)
    if (isAuthenticated) {
      setPendingId(item.id)
      try {
        const res = await removeMutation(item.id)
        if (!res.success) {
          addItem(backup)
          toast.error('Failed to remove item')
        }
      } catch {
        addItem(backup)
        toast.error('Server error')
      } finally {
        setPendingId(null)
      }
    }
  }

  return { onRemove, onIncrease, onDecrease, onAddToCart, pendingId }
}
