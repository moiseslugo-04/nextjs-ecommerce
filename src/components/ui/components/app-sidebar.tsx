'use client'

import * as React from 'react'
import {
  User2Icon,
  HousePlus,
  CreditCard,
  Package,
  UserLock,
} from 'lucide-react'

import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@components/ui/sidebar'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Profile',
      path: '/profile',
      Icon: User2Icon,
    },
    {
      title: 'Address',
      path: '/address',
      Icon: HousePlus,
    },
    {
      title: 'Cards',
      path: '/cards',
      Icon: CreditCard,
    },
    {
      title: 'Orders',
      path: '/orders',
      Icon: Package,
    },
    {
      title: 'Authentication',
      path: '/auth',
      Icon: UserLock,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className='mt-4'>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
