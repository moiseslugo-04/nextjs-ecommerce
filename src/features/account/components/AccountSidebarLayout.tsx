'use client'
import * as React from 'react'
import { data } from '@lib/utils/constants/navbar-data'
import { Navbar } from '@/features/account/components/Navbar'
import { UserNavbar } from '@/features/account/components/UserNavbar'
import { BrandHeader } from '@components/shared/BrandHeader'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@components/ui/sidebar'
import { ProfileDTO } from '@/features/profile/types'
type AppSidebarProps = {
  profile: ProfileDTO | null
} & React.ComponentProps<typeof Sidebar>
export function AccountSidebarLayout({ profile, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <BrandHeader
          subtitle='User Account'
          brandName='Gechis'
          logoSrc='/logo.svg'
        />
      </SidebarHeader>
      <SidebarContent className='mt-4'>
        <Navbar items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserNavbar profile={profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
