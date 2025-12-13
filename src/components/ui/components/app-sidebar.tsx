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
      title: 'Account',
      path: '/account',
      Icon: User2Icon,
    },
    {
      title: 'Address',
      path: '/account/address',
      Icon: HousePlus,
    },
    {
      title: 'Cards',
      path: '/account/cards',
      Icon: CreditCard,
    },
    {
      title: 'Orders',
      path: '/account/orders',
      Icon: Package,
    },
    {
      title: 'Authentication',
      path: '/account/auth',
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
