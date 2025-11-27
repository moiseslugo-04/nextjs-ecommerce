'use client'

import { logout } from '@features/auth/logout'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function useLogout() {
  const [isPending, startTransition] = useTransition()
  const { replace } = useRouter()
  const closeSession = async () => {
    startTransition(async () => {
      await logout()
      toast('Session closed')
      replace('/auth')
    })
  }
  return { closeSession, isPending }
}
