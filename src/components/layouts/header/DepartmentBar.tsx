'use client'

import { cn } from '@lib/ui/utils'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export function DepartmentBar({
  department,
}: {
  department: { name: string; slug: string; id: number }[]
}) {
  const segment = useSelectedLayoutSegment()
  return (
    <div className='w-full  bg-gechis-blue-dark'>
      <div className='w-full  flex   justify-start  gap-3  max-w-4xl mx-auto pt-2 px-9'>
        {department.map((department) => {
          const isActive = segment === `${department.slug}`
          return (
            <Link
              href={`/${department.slug}`}
              key={department.id}
              className={cn(
                'bg-gechis-blue-light text-white px-4 py-1 rounded-t-md transition-colors duration-200',
                isActive && 'bg-gechis-blue'
              )}
            >
              {department.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
