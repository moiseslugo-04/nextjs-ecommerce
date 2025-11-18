import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { RegisterSchema, registerSchema } from '@/schemas/user'
export function useRegister() {
  const { control, handleSubmit, formState } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })
  const [showPassword, setShowPassword] = useState(false)
  const onSubmit = handleSubmit((data: RegisterSchema) => {
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
    control,
    isLoading: formState.isLoading,
    showPassword,
    setShowPassword,
    onSubmit,
  }
}
