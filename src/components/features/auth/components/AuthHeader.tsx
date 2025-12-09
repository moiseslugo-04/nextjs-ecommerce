'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function AuthHeader() {
  const pathname = usePathname()

  const isLogin = pathname.includes('/login')

  const redirectTo = isLogin ? '/auth/identify' : '/auth/login'
  const label = isLogin ? 'Register' : 'Login'

  return (
    <div className='w-full max-w-4xl mx-auto flex justify-between items-center px-4 py-6'>
      {/* Home */}
      <Link
        href='/'
        className='text-gechis-blue font-medium hover:underline transition'
      >
        ← Home
      </Link>

      {/* Auth button */}
      <Link
        href={redirectTo}
        className='bg-white border border-neutral-200 text-black px-4 py-2 rounded-lg shadow-sm hover:bg-neutral-100 hover:shadow-md transition-all duration-200 text-sm font-medium'
      >
        {label}
      </Link>
    </div>
  )
}
