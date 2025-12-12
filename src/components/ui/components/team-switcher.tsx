'use client'

import { SidebarMenu, SidebarMenuItem } from '@components/ui/sidebar'
import Image from 'next/image'

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className='w-full flex justify-between items-center '>
        <div className='flex gap-2 items-center'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg outline-1 outline-black text-sidebar-primary-foreground'>
            <Image
              width={50}
              height={50}
              quality={75}
              src={'/logo.svg'}
              alt='Gechis logo '
            />
          </div>
          <div className='grid  text-left text-sm leading-tight'>
            <p className='truncate font-semibold'>Gechis</p>
            <span className='truncate text-xs'>User Account</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
