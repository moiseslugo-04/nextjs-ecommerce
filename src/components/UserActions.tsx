import { AccountMenu } from './AccountMenu'
import { Cart } from './Cart'
import { LanguageSwitcher } from './LanguageSwitcher'
export async function UserActions() {
  return (
    <div className='flex items-center gap-3'>
      {/**User Login preference*/}
      <AccountMenu />
      <LanguageSwitcher />
      <Cart />
    </div>
  )
}
