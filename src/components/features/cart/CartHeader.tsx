import { SheetHeader, SheetTitle, SheetDescription } from '@components/ui/sheet'
import Image from 'next/image'
export function CartHeader() {
  return (
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
  )
}
