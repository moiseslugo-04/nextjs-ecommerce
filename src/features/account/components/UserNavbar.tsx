import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@components/ui/sidebar'
import { Button } from '@components/ui/button'
import { logout } from '@features/auth/server/auth.action'
import { ProfileDTO } from '@features/profile/types'
export function UserNavbar({ profile }: { profile: ProfileDTO }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem className=' flex flex-col gap-4 '>
        <SidebarMenuButton asChild>
          <Button className='flex items-start justify-start' onClick={logout}>
            <LogOut className='-ml-1' />
            <p className='leading-tight text-sm truncate'>Log out</p>
          </Button>
        </SidebarMenuButton>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage src={profile?.avatar ?? ''} alt={'User avatar'} />
            <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{profile?.username}</span>
            <span className='truncate text-xs'>{profile?.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
