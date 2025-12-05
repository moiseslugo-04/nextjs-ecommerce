import { Plus, Minus, Trash } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from '@components/ui/item'
import { SerializedProduct } from '@features/products/product.types'
import { useCartStore } from '@/lib/features/cart/client/useCartStore'
export function CartItem({ item }: { item: SerializedProduct }) {
  const { remove, increment, decrement } = useCartStore()
  if (!item) return
  return (
    <Item className='flex gap-3 rounded-lg border  border-top  bg-card p-3 shadow-sm mx-2'>
      {/* IMAGE */}
      <Image
        width={64}
        height={80}
        quality={100}
        className='w-16 h-20 rounded-md object-cover'
        src={item?.imageUrl ?? ''}
        alt={item?.imageAlt ?? `${item.name} image`}
      />

      {/* CONTENT */}
      <ItemContent className='flex flex-col flex-1 justify-between'>
        <ItemDescription className='flex flex-col gap-1'>
          <p className='text-sm font-semibold text-foreground line-clamp-2'>
            {item.name}
          </p>

          <p className='text-xs text-muted-foreground'>
            Category: {item.category.name}
          </p>

          <p className='text-sm font-bold text-primary'>
            Price: $ {item.price}
          </p>
        </ItemDescription>

        {/* ACTIONS */}
        <ItemActions className='flex items-center justify-between mt-2'>
          <div className='flex items-center gap-2'>
            <Button
              size='icon'
              variant='outline'
              onClick={() => decrement(item.id)}
              className='h-7 w-7'
            >
              <Minus className='size-3' />
            </Button>

            <span className='w-5 text-center text-sm font-medium'>
              {item.quantity ?? 0}
            </span>

            <Button
              size='icon'
              onClick={() => increment(item.id)}
              className='h-7 w-7 bg-primary text-primary-foreground hover:opacity-90'
            >
              <Plus className='size-3' />
            </Button>
          </div>

          <Button
            variant='ghost'
            onClick={() => remove(item.id)}
            className='h-7 px-2 text-xs text-muted-foreground hover:text-destructive'
          >
            <Trash className='size-3 mr-1' />
            Remove
          </Button>
        </ItemActions>
      </ItemContent>
    </Item>
  )
}
