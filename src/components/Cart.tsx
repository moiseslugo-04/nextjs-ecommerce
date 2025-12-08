'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
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
import Image from 'next/image'

export function Cart() {
  const { cart, totalCart } = useCartStore()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary' className='relative'>
          <span className='absolute -top-1 -right-1 size-5 rounded-full bg-gechis-gold text-gechis-blue text-xs font-bold flex items-center justify-center'>
            {cart.length}
          </span>
          <ShoppingCart className='size-5' />
        </Button>
      </SheetTrigger>

      <SheetContent className='bg-gechis-blue text-white shadow-2xl flex flex-col'>
        {/* HEADER */}
        <SheetHeader className='border-b border-white/10 pb-4'>
          <div className='flex gap-3 items-center'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-white text-gechis-blue'>
              <Image src='/logo.svg' width={28} height={28} alt='Logo' />
            </div>

            <div>
              <SheetTitle className='text-lg font-semibold tracking-tight'>
                Shopping Cart
              </SheetTitle>
              <SheetDescription className='text-sm text-white/70'>
                Review your items before checkout
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* ITEMS */}
        <div className='flex flex-col gap-4 py-4 px-2 overflow-y-auto flex-1'>
          {cart.length > 0 ? (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className='text-center text-sm text-white/70'>
              Your cart is empty
            </p>
          )}
        </div>

        {/* FOOTER */}
        <SheetFooter className='pt-4 flex flex-col gap-4 bg-gechis-blue border-t border-white/10'>
          <div className='flex w-full items-center justify-between'>
            <span className='text-sm text-white/70'>Total</span>
            <span className='text-xl font-bold text-gechis-gold'>
              $ {totalCart().toFixed(2)}
            </span>
          </div>

          <Link
            href='/checkout'
            className='w-full bg-gechis-gold rounded-xl py-3 text-center text-gechis-blue font-bold hover:scale-[1.02] transition'
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
