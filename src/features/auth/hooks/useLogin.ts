'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginSchema, LoginSchema } from '@features/users/user.schema'
import { useRouter, useSearchParams } from 'next/navigation'
import { signup } from '@/features/auth/server/auth.action'
import { ACTION_MESSAGES } from '@/lib/utils/constants/actions'
import { useMutation } from '@tanstack/react-query'
export function useLogin(email?: string) {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: signup,
  })
  const params = useSearchParams()
  const { replace, refresh } = useRouter()
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: email ?? '',
    },
  })
  const onSubmit = methods.handleSubmit(async (data: LoginSchema) => {
    try {
      //transform the data into formData Obj
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => formData.set(k, v))
      const res = await mutateAsync(formData)
      if (!res.success) {
        const action = res.action && ACTION_MESSAGES[res.action]
        toast.error(res.error, {
          description: action?.description,
          action: action
            ? {
                label: action.title,
                onClick: () => {
                  replace(action.route, { scroll: false })
                },
              }
            : undefined,
        })
        return
      }
      toast.success('Login successful')
      const callback = params.get('callback')
      const safe = callback?.startsWith('/') ? callback : '/'
      refresh()
      replace(safe)
    } catch (error) {
      console.log(error, 'server error')
      toast.error('Unexpected error')
    }
  })

  return {
    isLoading: isPending,
    methods,
    onSubmit,
  }
}
