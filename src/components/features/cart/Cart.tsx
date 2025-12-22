'use client'
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@components/ui/button'
import { CartItem } from '@/components/features/cart/CartItem'
import { useCartStore } from '@/lib/features/cart/client/store/useCartStore'
import { useCartActions } from '@/lib/features/cart/client/hooks/useCartActions'
import { Spinner } from '@components/ui/spinner'
import { CartHeader } from './CartHeader'
import { CartSummary } from './CartSummary'
import { useSession } from '@/lib/features/auth/server/session/client/useSession'
export function Cart() {
  const { cart, totalCart, isSync } = useCartStore()
  const { data: session } = useSession()
  const actions = useCartActions({
    isAuthenticated: !!session?.isAuthenticated,
  })
  const total = Number(totalCart().toFixed(2))
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='secondary'
          className='relative cursor-pointer hover:bg-gechis-accent ease-in-out duration-300'
        >
          <span className='absolute -top-1 -right-1 size-5 rounded-full bg-gechis-gold text-gechis-blue text-xs font-bold flex items-center justify-center'>
            {cart.length}
          </span>
          <ShoppingCart className='size-5' />
        </Button>
      </SheetTrigger>

      <SheetContent className='bg-gechis-blue text-white shadow-2xl flex flex-col'>
        {/* HEADER */}
        <CartHeader />

        {isSync ? (
          <div className='flex items-center justify-center h-40'>
            <Spinner />
          </div>
        ) : (
          <div className='flex flex-col gap-4 py-4 px-2 overflow-y-auto flex-1'>
            {cart.length > 0 ? (
              cart.map((item) => (
                <CartItem key={item.id} item={item} actions={actions} />
              ))
            ) : (
              <p className='text-center text-sm text-white/70'>
                Your cart is empty
              </p>
            )}
          </div>
        )}
        {/* FOOTER */}
        <CartSummary total={total} />
      </SheetContent>
    </Sheet>
  )
}
