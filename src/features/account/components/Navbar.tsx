'use client'

import { type LucideIcon, Store } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from '@components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/ui/utils'

type ItemType = {
  title: string
  path: string
  Icon?: LucideIcon
}
export function Navbar({ items }: { items: ItemType[] }) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account settings</SidebarGroupLabel>
      <SidebarMenu>
        <Link href={'/'}>
          <SidebarMenuButton
            className='bg-gechis-gold justify-center rounded-lg '
            tooltip={'Go Home'}
          >
            <Store aria-label='button go to store' className='ml-2' />
            <span className='font-semibold   text-sm truncate'>
              Go to Store
            </span>
          </SidebarMenuButton>
        </Link>
        {items.map(({ title, path, Icon }) => {
          const isRootAccount = path === '/account'
          const isActive = isRootAccount
            ? pathname === '/account'
            : pathname.startsWith(path)
          return (
            <Link
              href={path}
              key={title}
              onClick={() => {
                if (isMobile) {
                  setOpenMobile(false)
                }
              }}
              className={cn(isActive && 'bg-gray-200 rounded-md')}
            >
              <SidebarMenuButton tooltip={title}>
                {Icon && <Icon />}
                <span>{title}</span>
              </SidebarMenuButton>
            </Link>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
