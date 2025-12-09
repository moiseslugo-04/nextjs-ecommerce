'use client'
import { useState } from 'react'
import { emailSchema, EmailSchema } from '@features/users/user.schema'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkEmailAction } from '@/lib/features/auth/credentials/actions/emailCheck.action'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
export function useIdentify() {
  const { replace } = useRouter()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: checkEmailAction,
    mutationKey: ['authSession'],
  })
  const { control, handleSubmit } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  })
  const [email, setEmail] = useState('')

  const onSubmit = handleSubmit(async (data) => {
    try {
      setEmail(data.email)
      const result = await mutateAsync(data.email)
      if (result.exists) {
        toast.warning('Email already exists. Please login.')
        replace(`/auth/login?email=${data.email}`, { scroll: false })
        return
      }
      replace(`/auth/register?email=${data.email}`, { scroll: false })
    } catch (error) {
      console.log(error, 'error in server action')
    }
  })
  return {
    onSubmit,
    email,
    isPending,
    control,
  }
}
