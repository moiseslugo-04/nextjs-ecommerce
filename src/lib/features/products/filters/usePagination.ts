import { useFilter } from './useFilters'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export function usePagination({
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

  return {
    visiblePages,
    hasNext,
    hasPrev,
    updateParams,
    currentPage,
    totalPages,
  }
}
