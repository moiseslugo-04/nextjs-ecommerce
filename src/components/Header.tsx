import Logo from './Logo'
import { InputSearch } from './InputSearch'
import { UserActions } from './UserActions'
import prisma from '@/lib/client'
import { DepartmentBar } from './DepartmentBar'
import { Suspense } from 'react'
import { Skeleton } from '@components/ui/skeleton'
export default async function Header() {
  const department = await prisma.department.findMany()
  return (
    <header className='bg-gechis-blue sticky top-0 z-50 shadow-md flex flex-col justify-center'>
      <DepartmentBar department={department} />
      <div className='w-full grid grid-cols-2 px-4 py-4 gap-3 max-w-4xl sm:grid-cols-[1fr_2fr_1fr] grid-rows-2 sm:grid-rows-1 mx-auto'>
        <Logo />
        <Suspense
          fallback={<Skeleton className='h-9 w-full rounded-sm bg-gray-400' />}
        >
          <div className='row-start-2 col-span-2 w-full max-w-lg place-self-center sm:row-auto sm:col-auto'>
            <InputSearch />
          </div>
        </Suspense>

        <div className='place-self-end'>
          <UserActions />
        </div>
      </div>
    </header>
  )
}
