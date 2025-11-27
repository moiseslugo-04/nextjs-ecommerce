import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { RegisterSchema, registerSchema } from '@/schemas/user'
import { useTransition } from 'react'
import { registerAction } from '@/lib/features/auth/credentials/actions/register.action'
export function useRegister(email: string) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const {
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      email: email ?? '',
    },
  })
  const onSubmit = handleSubmit((data: RegisterSchema) => {
    startTransition(async () => {
      try {
        const formData = new FormData()
        Object.entries(data).forEach(([Key, value]) => formData.set(Key, value))
        const res = await registerAction(formData)
        if (!res.success) {
          if (res.field && res.error) {
            setError(
              res.field as keyof RegisterSchema,
              {
                type: 'manual',
                message: res.error.toString(),
              },
              { shouldFocus: true }
            )
          } else {
            throw new Error(res.error?.toString())
          }
          return
        }
        toast.success('user create with success')
        setSuccess(true)
      } catch (error) {
        setSuccess(false)
        const message = error instanceof Error ? error.message : 'Unknown Error'
        toast.error(message, { className: '!bg-red-600 !text-white' })
      }
    })
  })

  return {
    control,
    isLoading: isSubmitting || isPending,
    onSubmit,
    success,
    email: getValues('email'),
  }
}
