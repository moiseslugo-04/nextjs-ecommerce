import Logo from '@/components/shared/Logo'
import { HeaderMenu } from '@components/layouts/header/HeaderMenu'
import { DepartmentBar } from '@/components/layouts/header/DepartmentBar'
import { getAllDepartments } from '@features/products/product.repository'
import { HeaderSearch } from './HeaderSearch'
export default async function Header() {
  const department = await getAllDepartments()
  return (
    <header className='bg-gechis-blue sticky top-0 z-50 shadow-md flex flex-col justify-center'>
      <DepartmentBar department={department} />
      <div className='w-full grid px-4 py-4 gap-3 max-w-4xl sm:grid-cols-[1fr_2fr_1fr] sm:grid-rows-1 mx-auto'>
        <Logo />
        <HeaderSearch />
        <HeaderMenu />
      </div>
    </header>
  )
}
