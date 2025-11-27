import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginSchema, LoginSchema } from '@/schemas/user'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/lib/features/auth/login.action'
import { useTransition } from 'react'
export function useLogin(email: string) {
  const [isPending, startTransition] = useTransition()
  const { replace } = useRouter()
  const { handleSubmit, control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: email ?? '',
    },
  })

  const onSubmit = handleSubmit(async (data: LoginSchema) => {
    startTransition(async () => {
      try {
        const formData = new FormData()
        Object.entries(data).forEach(([k, v]) => formData.set(k, v))
        const res = await loginAction(formData)
        if (res.warning) {
          toast.warning(res.error, {
            description: 'you need to verified you email',
            action: {
              label: 'verify',
              onClick: () => replace('/verify/email'),
            },
          })
          return
        }
        if (!res.success) {
          toast.error(res.error)
          return
        }
        toast.success('Login successful')
        const redirect = res.data?.user.role === 'ADMIN' ? '/dashboard' : '/'
        replace(redirect)
      } catch (error) {
        console.log(error, 'server error')
        toast.error('Unexpected error', {
          className: '!bg-red-600 !text-white',
        })
      }
    })
  })

  return {
    isLoading: isPending,
    control,
    onSubmit,
  }
}
