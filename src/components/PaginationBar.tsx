'use client'
import { useFilter } from '@/lib/hooks/useFilter'
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
interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
export function PaginationBar({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
}: PaginationProps) {
  const { updateParams } = useFilter()
  const maxVisible = 3
  // Ideal centered window
  let start = currentPage - 1
  let end = currentPage + 1

  // Clamp left side
  if (start < 1) {
    start = 1
    end = Math.min(maxVisible, totalPages)
  }

  // Clamp right side
  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, totalPages - maxVisible + 1)
  }

  const visiblePages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  )

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
