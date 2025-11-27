import { ShoppingCart } from 'lucide-react'
import { AccountMenu } from './AccountMenu'
import { LanguageSwitcher } from './LanguageSwitcher'
import { getCookies } from '@/lib/services/cookiesServices'
import { Role } from '@prisma/client'

export async function UserActions() {
  const role = await getCookies('user-role')
  return (
    <div className='flex items-center gap-3'>
      {/**User Login preference*/}
      <AccountMenu role={role as Role} />
      <LanguageSwitcher />
      <span className='relative'>
        <span className='absolute size-5 bg-gechis-gold-dark text-sm font-bold rounded-4xl -top-2 left-4 flex items-center justify-center'>
          0
        </span>
        <ShoppingCart className='text-white' size={25} />
      </span>
    </div>
  )
}
