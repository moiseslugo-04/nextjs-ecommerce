import { useState } from 'react'
import { UserRound } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
export function AccountMenu() {
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
          <Link href='#'>My orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='#'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuLabel>
          <Link href='/auth/login'>Login</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
