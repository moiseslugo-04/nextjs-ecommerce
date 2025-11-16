'use client'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  useDepartmentSearch,
  type DepartmentType,
} from '@/hooks/useDepartmentSearch'
export function InputSearch() {
  const { handleSearch, department, searchParams } = useDepartmentSearch()
  if (!department) return null
  const placeholders: Record<DepartmentType, string> = {
    market: 'market,snacks, coca cola, and so on...',
    beauty: 'makeup,perfumes, skin care,and so on...',
    clothes: 'beauty, jeans, shoes, and so on...',
    default: 'Beauty, Clothes, Market...',
  }
  return (
    <form
      onSubmit={handleSearch}
      role='search'
      className='flex items-stretch justify-center  overflow-hidden w-full '
    >
      <label htmlFor='site-search' className='sr-only'>
        Search for products or brands
      </label>
      <Input
        key={department}
        id='site-search'
        type='query'
        name='query'
        defaultValue={searchParams?.get('query')?.toString() ?? ''}
        className=' bg-white p-2  rounded-sm rounded-br-none rounded-tr-none placeholder:text-gray-400 border-none  '
        placeholder={placeholders[department ?? 'default']}
      />
      <Button
        type='submit'
        className='bg-gechis-blue-dark hover:bg-gechis-blue-light cursor-pointer py-2 px-6 rounded-sm rounded-bl-none rounded-tl-none'
        size='icon'
        aria-label='Search'
      >
        <Search className='text-white' />
      </Button>
    </form>
  )
}
