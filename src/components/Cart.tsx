'use client'

import {
  SheetContent,
  SheetHeader,
  SheetTrigger,
  Sheet,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from './ui/sheet'
import { ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import { CartItem } from './CartItem'
import { useCartStore } from '@/lib/features/cart/client/useCartStore'
import Link from 'next/link'
export function Cart() {
  const { cart, totalCart } = useCartStore()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary' className='relative cursor-pointer'>
          <span
            className='absolute -top-1 -right-1 size-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center
          bg-gechis-gold'
          >
            {cart.length}
          </span>
          <ShoppingCart className='size-5' />
        </Button>
      </SheetTrigger>

      <SheetContent className='bg-gechis-blue text-foreground border-l border-border shadow-2xl flex flex-col text-white'>
        <SheetHeader className='border-b border-border pb-4'>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription className='text-muted-foreground'>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-3 py-4 overflow-y-auto flex-1 scroll-smooth'>
          {cart.length > 0 ? (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className='text-center'>Empty cart</p>
          )}
        </div>

        <SheetFooter className='border-t border-border pt-4 flex flex-col gap-3 bg-background'>
          <div className='flex w-full items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Total</span>
            <span className='text-lg font-bold text-primary'>
              $ {totalCart().toFixed(2)}
            </span>
          </div>

          <Link
            href={'/payment'}
            className='w-full bg-primary text-primary-foreground hover:opacity-90'
          >
            Checkout
          </Link>

          <SheetClose asChild>
            <Button variant='outline' className='w-full'>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
