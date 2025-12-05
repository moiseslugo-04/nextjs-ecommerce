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
import { useSession } from '@features/auth/client/hooks/useSession'
import { useLogout } from '@features/auth/client/hooks/useLogout'
export function AccountMenu() {
  const { data: session } = useSession()
  const { closeSession, isPending } = useLogout()
  const isAdmin = session?.payload.role === 'ADMIN'
  const isLoggedIn = session?.payload.id ? true : false

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
          <Link href='/orders'>My orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/profile'>Profile</Link>
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
