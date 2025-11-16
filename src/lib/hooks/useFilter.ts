'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
export function useFilter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams?.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })
      replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [replace, searchParams, pathname]
  )
  const handleChangeTerm = useDebouncedCallback(
    (query: string) => updateParams({ query }),
    300
  )
  const handleChangeFilter = (category: string) => updateParams({ category })
  const handleChangeSort = (sort: boolean) => {
    updateParams({ sort: sort ? 'asc' : undefined })
  }
  return {
    handleChangeTerm,
    handleChangeSort,
    handleChangeFilter,
    searchParams,
    updateParams,
  }
}
