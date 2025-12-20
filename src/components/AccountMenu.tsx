'use client'

import { useState } from 'react'
import { UserRound } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { useLogout } from '@features/auth/client/hooks/useLogout'
import { useSession } from '@features/auth/server/session/client/useSession'
export function AccountMenu() {
  const { closeSession, isPending } = useLogout()
  const { data: session } = useSession()
  const isLoggedIn = session?.isAuthenticated
  const isAdmin = isLoggedIn && session.payload.role === 'ADMIN'

  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger onMouseEnter={() => setOpen(true)}>
        <div className='cursor-pointer'>
          <UserRound className='text-white' size={25} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        onMouseLeave={() => setOpen(false)}
        className='bg-gechis-blue-dark text-white'
      >
        <DropdownMenuItem>
          <Link href='/account/orders'>My orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/account'>Profile</Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem>
            <Link href='/dashboard'>Dashboard</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuLabel>
          {isLoggedIn ? (
            <Button
              className='cursor-pointer text-red-300 text-start hover:text-red-500 ease-in'
              onClick={closeSession}
            >
              {isPending ? 'Closing...' : 'Logout'}
            </Button>
          ) : (
            <Link href='/auth/identify'>Login</Link>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
