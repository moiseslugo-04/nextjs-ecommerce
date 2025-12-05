import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export const emailSchema = z.object({
  email: z.email('Invalid email address'),
})
type EmailType = z.infer<typeof emailSchema>
export function useResetPassword(token: string) {
  console.log(token)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmailType>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(async (data: EmailType) => {
    console.log(data)
  })

  return { onSubmit, errors, control }
}
