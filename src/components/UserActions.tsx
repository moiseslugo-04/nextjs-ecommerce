'use client'
import { ShoppingCart } from 'lucide-react'
import { AccountMenu } from './AccountMenu'
import { LanguageSwitcher } from './LanguageSwitcher'

export function UserActions() {
  return (
    <div className='flex items-center gap-3'>
      {/**User Login preference*/}
      <AccountMenu />
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
