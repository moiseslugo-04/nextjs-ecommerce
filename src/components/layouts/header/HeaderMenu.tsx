import { AccountMenu } from '@components/AccountMenu'
import { Cart } from '@/components/features/cart/Cart'
export async function HeaderMenu() {
  return (
    <div className='flex items-center gap-3 place-self-end'>
      <AccountMenu />
      <Cart />
    </div>
  )
}
