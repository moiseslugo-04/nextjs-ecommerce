'use client'
import {
  incrementQuantityAction,
  decrementQuantityAction,
  removeCartItemAction,
  addToCartAction,
} from '../cart.actions'
import { toast } from 'sonner'
import { useCartStore } from './useCartStore'
import { CartItemType, ActionPayload } from '../types'
import { SerializedProduct } from '@features/products/types'
import { useSession } from '@/features/auth/server/session/hooks/useSession'
import { useState } from 'react'
export function useCartActions() {
  const [loadingItemId, setLoadingItemId] = useState<number | null>(null)

  const {
    session: { isAuthenticated },
  } = useSession()
  const { increment, decrement, removeItem, addItem } = useCartStore()

  // Add to cart
  const onAddToCart = async (item: SerializedProduct) => {
    // We call addItem in both cases:
    // guest → client-side cart
    // authenticated → optimistic update, then sync with backend

    if (isAuthenticated) {
      try {
        addItem({ ...item, quantity: 1, isGuest: !isAuthenticated })
        toast.promise(addToCartAction(item.id), {
          loading: `Adding ${item.name} to your cart...`,
          success: `${item.name} added to your cart`,
          error: `Couldn't add ${item.name} to your cart`,
        })
      } catch {
        removeItem(item.id)
      }
    } else {
      addItem({ ...item, quantity: 1, isGuest: !isAuthenticated })
      toast.success(`${item.name} was add with success`)
    }
  }
  //Increase Quantity
  const onIncrease = async (item: ActionPayload) => {
    setLoadingItemId(item.id)
    if (isAuthenticated) {
      try {
        increment(item.id)
        toast.promise(incrementQuantityAction(item.id), {
          loading: `Updating quantity of ${item.name}...`,
          success: `Increased quantity of ${item.name}`,
          error: `Couldn't increase quantity of ${item.name}`,
        })
      } catch {
        decrement(item.id)
      } finally {
        setLoadingItemId(null)
      }
    } else {
      increment(item.id)
      toast.success(`Increased quantity of ${item.name}`)
    }
  }
  //Decrease Quantity
  const onDecrease = async (item: ActionPayload) => {
    setLoadingItemId(item.id)

    if (isAuthenticated) {
      try {
        decrement(item.id)
        toast.promise(decrementQuantityAction(item.id), {
          loading: `Updating quantity of ${item.name}...`,
          success: `Decreased quantity of ${item.name}`,
          error: `Couldn't decrease quantity of ${item.name}`,
        })
      } catch {
        increment(item.id)
      } finally {
        setLoadingItemId(null)
      }
    } else {
      decrement(item.id)
      toast.success(`Decreased quantity of ${item.name}`)
    }
  }
  //Remove  Item
  const onRemove = async (item: CartItemType) => {
    setLoadingItemId(item.id)
    const backup = item
    if (isAuthenticated) {
      try {
        removeItem(item.id)
        toast.promise(removeCartItemAction(item.id), {
          loading: `Removing ${item.name} from your cart...`,
          success: `${item.name} removed from your cart`,
          error: `Couldn't remove ${item.name} from your cart`,
        })
      } catch {
        addItem(backup)
      } finally {
        setLoadingItemId(null)
      }
    } else {
      removeItem(item.id)
      toast.success(`${item.name} removed from your cart`)
    }
  }

  return { onRemove, onIncrease, onDecrease, onAddToCart, loadingItemId }
}
