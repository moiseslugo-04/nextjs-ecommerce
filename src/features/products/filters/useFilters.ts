'use client'
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from 'next/navigation'

import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { FormEvent } from 'react'
export type DepartmentType = 'market' | 'beauty' | 'clothes' | 'default'
export function useFilter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const department = useSelectedLayoutSegment() as DepartmentType | null
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
  const onSearch = useDebouncedCallback((e: FormEvent<HTMLFormElement>) => {
    const params = new URLSearchParams(searchParams?.toString())
    const term = e.currentTarget.value
    if (term.trim()) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`/${pathname}/search?${params.toString()}`)
  }, 300)
  return {
    department,
    onSearch,
    searchParams,
    updateParams,
    defaultSearchTerm: searchParams.get('query') ?? '',
  }
}
