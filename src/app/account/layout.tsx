import { verifySession } from '@/lib/dal/session'
import { AppSidebar } from '@components/ui/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@components/ui/sidebar'
import { ReactNode } from 'react'

export default async function Page({ children }: { children: ReactNode }) {
  const session = await verifySession()
  console.log(session)
  return (
    <SidebarProvider className='overflow-hidden'>
      <AppSidebar />

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
                Profile
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
