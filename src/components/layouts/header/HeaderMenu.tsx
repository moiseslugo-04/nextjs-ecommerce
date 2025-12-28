import { AccountMenu } from '@components/AccountMenu'
import { Cart } from '@/features/cart/components/Cart'
export async function HeaderMenu() {
  return (
    <div className='flex items-center gap-3 place-self-end'>
      <AccountMenu />
      <Cart />
    </div>
  )
}
