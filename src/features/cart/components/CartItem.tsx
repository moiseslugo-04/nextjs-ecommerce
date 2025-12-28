'use client'

import type { CartItemType, ActionPayload } from '@/features/cart/types'
import { Plus, Minus, Trash } from 'lucide-react'
import { Button } from '@components/ui/button'
import Image from 'next/image'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from '@components/ui/item'

interface CartItemProps {
  item: CartItemType
  actions: {
    onDecrease: (props: ActionPayload) => void
    onIncrease: (props: ActionPayload) => void
    onRemove: (props: CartItemType) => void
    pendingId: number | null
  }
}
export function CartItem({ item, actions }: CartItemProps) {
  if (!item) return
  const { onDecrease, onIncrease, onRemove, pendingId } = actions
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
            onClick={() => onRemove(item)}
            disabled={pendingId === item.id}
            aria-disabled={pendingId === item.id}
            className='absolute top-2 right-2 hover:bg-red-500/10'
          >
            <Trash className='size-5 text-red-400' />
          </Button>

          <div className='flex items-center gap-2 mt-auto'>
            <Button
              size='icon'
              variant='outline'
              aria-disabled={pendingId === item.id}
              title='Decrease quantity'
              onClick={() => onDecrease({ id: item.id, name: item.name })}
              aria-label={`Decrease quantity of ${item.name}`}
              disabled={pendingId === item.id}
              className={`h-8 w-8 rounded-full cursor-pointer hover:bg-gray-700 ${pendingId === item.id ? 'bg-red-600' : ''}`}
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
              onClick={() => onIncrease({ id: item.id, name: item.name })}
              disabled={pendingId === item.id}
              title='Increase quantity'
              aria-label={`Increase quantity of ${item.name}`}
              aria-disabled={pendingId === item.id}
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
