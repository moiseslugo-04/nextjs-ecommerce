import { AccountSidebarLayout } from '@/features/account/components/AccountSidebarLayout'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@components/ui/sidebar'
import { ReactNode } from 'react'
import { getProfile } from '@/features/profile/server/profile.service'
export default async function Layout({ children }: { children: ReactNode }) {
  const profile = await getProfile()
  return (
    <SidebarProvider className='overflow-hidden'>
      <AccountSidebarLayout profile={profile} />
      <SidebarInset className='flex-1'>
        <section className='min-h-full flex flex-col  bg-neutral-50'>
          {/* Header */}
          <header
            className='
            flex h-16 items-center justify-between 
            border-b border-neutral-200 bg-white 
            px-4 rounded-xl shadow-sm
          '
          >
            <div className='flex items-center gap-3'>
              <SidebarTrigger className='rounded-lg p-2 hover:bg-neutral-100 transition' />
              <h1 className='text-lg font-semibold text-neutral-800'>
                Account
              </h1>
            </div>
          </header>

          {/* Page content */}
          <main className='w-full'>{children}</main>
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
