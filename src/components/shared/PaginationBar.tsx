'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination'
import { Suspense } from 'react'
import { usePagination } from '@/lib/features/products/filters/usePagination'
interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
export function PaginationBar(props: PaginationProps) {
  const {
    hasNext,
    hasPrev,
    visiblePages,
    updateParams,
    currentPage,
    totalPages,
  } = usePagination(props)
  return (
    <Suspense fallback={<p>Loading pagination...</p>}>
      <Pagination className='flex justify-center mb-4'>
        <PaginationContent
          className='  className="
    flex items-center  bg-white shadow-sm rounded-xl 
    px-4 py-2  m-2 border border-gray-200
    flex-wrap        
    justify-center    
    md:flex-nowrap    
    overflow-x-auto   
  "'
        >
          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious
              size={'default'}
              aria-disabled={!hasPrev}
              className={`rounded-lg p-2text-sm font-medium transition-colors  ${
                hasPrev
                  ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer '
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={() =>
                hasPrev
                  ? updateParams({ page: String(Number(currentPage) - 1) })
                  : null
              }
            >
              <span className='sr-only'>Previous</span>
            </PaginationPrevious>
          </PaginationItem>

          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                size={'default'}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  page == currentPage
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => updateParams({ page: String(page) })}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis for hidden pages */}
          {totalPages > 3 && (
            <PaginationEllipsis className='text-gray-400 px-2'>
              ...
            </PaginationEllipsis>
          )}

          {/* Next button */}
          <PaginationItem>
            <PaginationNext
              size={'default'}
              aria-disabled={!hasNext}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                hasNext
                  ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer '
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={() =>
                hasNext
                  ? updateParams({ page: String(Number(currentPage) + 1) })
                  : null
              }
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Suspense>
  )
}
