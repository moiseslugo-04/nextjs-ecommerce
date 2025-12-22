import { ChevronsUpDown, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@components/ui/sidebar'
import { Button } from '../button'
import { Suspense } from 'react'
import { logout } from '@/lib/features/auth/server/auth.action'

export function NavUser() {
  return (
    <Suspense>
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
              <AvatarImage
                src={'/assets/images/default-avatar.jpeg'}
                alt={'User avatar'}
              />
              <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{'Unknown'}</span>
              <span className='truncate text-xs'>{'example@gmail.com'}</span>
            </div>
            <ChevronsUpDown className='ml-auto size-4' />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Suspense>
  )
}
