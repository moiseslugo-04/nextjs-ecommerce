import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { RegisterSchema, registerSchema } from '@features/users/user.schema'
import { registerAction } from '@/features/auth/credentials/actions'
import { useMutation } from '@tanstack/react-query'
export function useRegister(email: string) {
  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: registerAction,
  })

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: { email: email ?? '' },
  })
  const { handleSubmit, setValue } = methods
  const onSubmit = handleSubmit(async (data: RegisterSchema) => {
    //Transform the data into formData Obj
    const formData = new FormData()
    Object.entries(data).forEach(([Key, value]) => formData.set(Key, value))
    try {
      const result = await mutateAsync(formData)
      if (result.success) {
        toast.success('Registration successful!')
      } else {
        setValue('email', '')
        toast.error(result.error ?? 'Something went wrong')
      }
    } catch {
      toast.error('Server error')
    }
  })

  return {
    methods,
    isLoading: isPending,
    onSubmit,
    success: isSuccess,
  }
}
