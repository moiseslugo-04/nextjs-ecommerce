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
import { Role } from '@prisma/client'
export function AccountMenu({ role }: { role: Role | null }) {
  const isAdmin = role === 'ADMIN'
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
          {role ? (
            <Link href='/'>Logout</Link>
          ) : (
            <Link href='/auth'>Login</Link>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
