import { setPasswordAction } from '@features/auth/credentials/actions/reset-password.action'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@features/users/user.schema'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

export function useSetPassword({ userId }: { userId: string }) {
  const { replace } = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: { password: string; userId: string }) =>
      setPasswordAction(payload.password, payload.userId),
    mutationKey: ['reset-password'],
  })
  const { handleSubmit, control } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  })
  const onSubmit = handleSubmit(async (data: ResetPasswordSchema) => {
    try {
      const result = await mutateAsync({ password: data.password, userId })
      if (result?.success) {
        toast.success('Password update with success')
        replace('/auth/login')
      }
    } catch (error) {
      console.log(error, 'unexpected error')
    }
  })

  return { onSubmit, control, isPending }
}
