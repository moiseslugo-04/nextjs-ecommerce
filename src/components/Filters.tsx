'use client'
import { useFilter } from '@/lib/hooks/useFilter'
import { ArrowBigDown } from 'lucide-react'
import { Suspense } from 'react'
interface FiltersProps {
  categories?: { name: string; slug: string }[]
}
export function Filters({ categories }: FiltersProps) {
  const { handleChangeFilter, handleChangeSort, searchParams } = useFilter()

  return (
    <Suspense fallback={<p>Loading Filters page</p>}>
      <div className='container-custom py-8'>
        <div className='flex justify-center gap-4 '>
          {/* Select + Buttons */}
          <div className='w-full gap-3 flex   items-center justify-around'>
            {categories && categories?.length > 0 && (
              <select
                defaultValue={searchParams?.get('filter') ?? ''}
                className='w-full border relative border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gechis-gold focus:border-transparent
              max-w-sm '
                onChange={(e) => handleChangeFilter(e.target.value)}
              >
                <option value=''>All</option>
                {categories.map(({ name, slug }) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </select>
            )}
            <label className='flex items-center  justify-center cursor-pointer'>
              <input
                aria-label='hidden'
                type='checkbox'
                className='hidden peer'
                onChange={(e) => handleChangeSort(e.target.checked)}
              />
              <div
                className='btn-outline flex items-center justify-center gap-2 px-4 py-2 rounded-md 
              transition-colors peer-checked:bg-gechis-gold peer-checked:text-white '
              >
                <ArrowBigDown size={18} />
                Sort
              </div>
            </label>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
