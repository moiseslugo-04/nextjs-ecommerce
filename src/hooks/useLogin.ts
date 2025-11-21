import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginSchema, LoginSchema } from '@/schemas/user'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/lib/actions/user/login'
export function useLogin(email: string) {
  const { replace, refresh } = useRouter()
  const { handleSubmit, control, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: email ?? '',
    },
  })

  const onSubmit = handleSubmit(async (data: LoginSchema) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => formData.set(k, v))
      const res = await loginAction(formData)
      if (!res.success) {
        if (res.error === 'Email not verified') {
          toast.warning(res.error, {
            description: 'you need to verified you email',
            action: {
              label: 'verify',
              onClick: () => replace('/verify/resend'),
            },
          })
          return
        }
        return toast.error(res.error)
      }
      toast.success('Login successful')
      refresh()
      replace('/dashboard')
    } catch (err) {
      console.log(err)
      toast.error('Unexpected error', {
        className: '!bg-red-600 !text-white',
      })
    }
  })

  return {
    isLoading: formState.isLoading,
    control,
    onSubmit,
  }
}
