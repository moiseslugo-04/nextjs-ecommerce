import { SheetFooter, SheetClose } from '@components/ui/sheet'
import { Button } from '@components/ui/button'
import { AppLink } from '@/components/shared/AppLink'
export function CartSummary({ total }: { total: number }) {
  return (
    <SheetFooter className='pt-4 flex flex-col gap-4 bg-gechis-blue border-t border-white/10'>
      <div className='flex w-full items-center justify-between'>
        <span className='text-sm text-white/70'>Total</span>
        <span className='text-xl font-bold text-gechis-gold'>$ {total}</span>
      </div>

      <AppLink href='/checkout' size={'lg'} variant={'primary'}>
        Checkout
      </AppLink>
      <SheetClose asChild>
        <Button variant='outline' className='w-full'>
          Close
        </Button>
      </SheetClose>
    </SheetFooter>
  )
}
