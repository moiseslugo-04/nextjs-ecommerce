'use client'

import { Plus, Minus, Trash } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from '@components/ui/item'
import { useCartStore } from '@/lib/features/cart/client/useCartStore'
import type { CartItemType } from '@features/cart/cart.types'
import { useSession } from '@/lib/features/auth/client/hooks/useSession'
import { useMutation } from '@tanstack/react-query'
import {
  incrementQuantityAction,
  decrementQuantityAction,
  removeCartItemAction,
} from '@/lib/features/cart/server/cart.actions'
import { toast } from 'sonner'
import { useState } from 'react'

export function CartItem({ item }: { item: CartItemType }) {
  const { increment, decrement, removeItem, addItem } = useCartStore()
  const { data: session } = useSession()
  const [pending, setPending] = useState(false)

  const { mutateAsync: increaseMutation } = useMutation({
    mutationFn: incrementQuantityAction,
  })

  const { mutateAsync: decreaseMutation } = useMutation({
    mutationFn: decrementQuantityAction,
  })

  const { mutateAsync: removeMutation } = useMutation({
    mutationFn: removeCartItemAction,
  })

  if (!item) return null

  const handleIncrease = async () => {
    if (pending) return
    setPending(true)

    increment(item.id)
    toast.success(`${item.name} quantity updated`)

    try {
      if (session) {
        const res = await increaseMutation(item.id)
        if (!res.success) {
          decrement(item.id)
          toast.error('Failed to update')
        }
      }
    } catch {
      decrement(item.id)
      toast.error('Server error')
    } finally {
      setPending(false)
    }
  }

  const handleDecrease = async () => {
    if (pending) return
    setPending(true)

    decrement(item.id)
    toast.success(`${item.name} quantity updated`)

    try {
      if (session) {
        const res = await decreaseMutation(item.id)
        if (!res.success) {
          increment(item.id)
          toast.error('Failed to update')
        }
      }
    } catch {
      increment(item.id)
      toast.error('Server error')
    } finally {
      setPending(false)
    }
  }

  const handleRemove = async () => {
    if (pending) return
    setPending(true)

    const backup = item
    removeItem(item.id)
    toast.success(`${item.name} removed from cart`)

    try {
      if (session) {
        const res = await removeMutation(item.id)
        if (!res.success) {
          addItem(backup, false)
          toast.error('Failed to remove item')
        }
      }
    } catch {
      addItem(backup, false)
      toast.error('Server error')
    } finally {
      setPending(false)
    }
  }

  return (
    <Item className='flex gap-3 rounded-xl bg-white/5 p-3 shadow-md relative'>
      {/* IMAGE */}
      <div className='relative w-16 h-20 rounded-md overflow-hidden'>
        <Image
          fill
          className='object-cover'
          src={item.imageUrl}
          alt={item.imageAlt ?? item.name}
        />
      </div>

      {/* CONTENT */}
      <ItemContent className='flex flex-row flex-1 justify-between'>
        <ItemDescription className='flex flex-col gap-1'>
          <p className='text-sm font-semibold line-clamp-2'>{item.name}</p>

          <p className='text-xs text-white/60'>{item.category.name}</p>

          <p className='text-base font-semibold text-gechis-gold'>
            $ {item.price.toFixed(2)}
          </p>
        </ItemDescription>

        {/* ACTIONS */}
        <ItemActions className='flex flex-col items-center justify-between'>
          <Button
            aria-label={`Remove ${item.name} from cart`}
            title='Remove item'
            variant='ghost'
            onClick={handleRemove}
            disabled={pending}
            aria-disabled={pending}
            className='absolute top-2 right-2 hover:bg-red-500/10'
          >
            <Trash className='size-5 text-red-400' />
          </Button>

          <div className='flex items-center gap-2 mt-auto'>
            <Button
              size='icon'
              variant='outline'
              aria-disabled={pending}
              title='Decrease quantity'
              onClick={handleDecrease}
              aria-label={`Decrease quantity of ${item.name}`}
              disabled={pending}
              className='h-8 w-8 rounded-full cursor-pointer hover:bg-gray-700'
            >
              <Minus className='size-3' />
            </Button>

            <span
              className='w-6 text-center text-sm font-medium '
              aria-live='polite'
              aria-atomic='true'
            >
              {item.quantity}
            </span>

            <Button
              size='icon'
              variant='outline'
              onClick={handleIncrease}
              disabled={pending}
              title='Increase quantity'
              aria-label={`Increase quantity of ${item.name}`}
              aria-disabled={pending}
              className='h-8 w-8 rounded-full cursor-pointer hover:bg-gray-700'
            >
              <Plus className='size-3' />
            </Button>
          </div>
        </ItemActions>
      </ItemContent>
    </Item>
  )
}
