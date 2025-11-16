'use client'

import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from 'next/navigation'
import { FormEvent } from 'react'

export type DepartmentType = 'market' | 'beauty' | 'clothes' | 'default'

export function useDepartmentSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const department = useSelectedLayoutSegment() as DepartmentType | null

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams?.toString())
    const formData = new FormData(e.currentTarget)
    const search = (formData.get('query') as string) || ''

    if (search.trim()) {
      params.set('query', search)
    } else {
      params.delete('query')
    }

    if (!department) return

    router.replace(`/${department}/search?${params.toString()}`)
  }

  return {
    department,
    searchParams,
    handleSearch,
  }
}
