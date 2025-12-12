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
import { useCartStore } from '@/lib/features/cart/client/store/useCartStore'
import { CartItemType, ActionPayload } from '@features/cart/cart.types'
import { SerializedProduct } from '@/lib/features/products/product.types'
export function useCartActions({
  isAuthenticated,
}: {
  isAuthenticated: boolean
}) {
  const { increment, decrement, removeItem, addItem } = useCartStore()
  const [pendingId, setPendingId] = useState<number | null>(null)

  const { mutateAsync: increaseMutation } = useMutation({
    mutationFn: incrementQuantityAction,

    onMutate: (productId) => {
      increment(productId)
      setPendingId(productId)
    },
    onError: (_err, productId) => {
      decrement(productId)
      toast.error('Failed to update')
    },
    onSuccess: () => {
      setPendingId(null)
    },
  })

  const { mutateAsync: decreaseMutation } = useMutation({
    mutationFn: decrementQuantityAction,
    onSuccess: () => {
      setPendingId(null)
    },
    onError: (_err, productId) => {
      increment(productId)
      toast.error('Failed to update')
    },
    onMutate: (productId) => {
      decrement(productId)
      setPendingId(productId)
    },
  })

  const { mutateAsync: removeMutation } = useMutation({
    mutationFn: removeCartItemAction,
    onSuccess: () => {
      setPendingId(null)
    },
    onMutate: (productId) => {
      setPendingId(productId)
    },
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
    toast.success(`${item.name} quantity updated`)
    if (!isAuthenticated) {
      increment(item.id)
      return
    }
    await increaseMutation(item.id)
  }

  const onDecrease = async (item: ActionPayload) => {
    if (pendingId === item.id) return
    decrement(item.id)
    toast.success(`${item.name} quantity updated`)
    if (!isAuthenticated) {
      decrement(item.id)
      return
    }
    await decreaseMutation(item.id)
  }

  const onRemove = async (item: CartItemType) => {
    if (pendingId === item.id) return
    const backup = item
    removeItem(item.id)
    toast.success(`${item.name} removed from cart`)
    if (isAuthenticated) {
      try {
        const res = await removeMutation(item.id)
        if (!res.success) {
          addItem(backup)
          toast.error('Failed to remove item')
        }
      } catch {
        addItem(backup)
        toast.error('Server error')
      }
    }
  }

  return { onRemove, onIncrease, onDecrease, onAddToCart, pendingId }
}
