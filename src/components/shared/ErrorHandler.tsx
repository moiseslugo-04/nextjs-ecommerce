'use client'

import { useEffect } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function ErrorHandler() {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const error = params.get('error')
    if (!error) return
    if (error === 'no-admin') toast.error('You do not have admin privileges')
    setTimeout(() => {
      const newParams = new URLSearchParams(params.toString())
      newParams.delete('error')
      router.replace(`${pathname}?${newParams.toString()}`)
    }, 10)
  }, [params, router, pathname])

  return null
}
