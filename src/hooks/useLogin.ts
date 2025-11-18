import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginSchema, LoginSchema } from '@/schemas/user'

export function useLogin() {
  const { handleSubmit, control, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    console.log(name, value)
  }

  const handleShowPassword = () => setShowPassword(!showPassword)
  const onSubmit = handleSubmit((data: LoginSchema) => {
    toast('You submitted the following values:', {
      description: JSON.stringify(data, null, 2),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    })
  })

  return {
    isLoading: formState.isLoading,
    showPassword,
    control,
    onSubmit,
    handleShowPassword,
    handleBlur,
  }
}
