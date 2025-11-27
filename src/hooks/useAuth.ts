'use client'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { emailSchema, EmailSchema } from '@/schemas/user'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkEmailAction } from '@/lib/features/auth/emailCheck.action'
export type Steps = 'email' | 'login' | 'register'
export function useAuth() {
  const searchParams = useSearchParams()
  const stepParma = searchParams.get('step') as Steps
  const [step, setStep] = useState<Steps>(stepParma || 'email')
  const { control, handleSubmit } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  })
  const [email, setEmail] = useState('')
  const [isPending, startTransition] = useTransition()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setEmail(data.email)
      startTransition(async () => {
        const result = await checkEmailAction(data.email)
        if (result.exists) {
          toast.warning('Email already exists. Please login.')
          setStep('login')
          return
        }
        setStep('register')
      })
    } catch (error) {
      console.log(error, 'error in server action')
    }
  })

  const setLoginStep = () => {
    setEmail('')
    setStep('login')
  }
  const setRegisterStep = () => {
    setEmail('')
    setStep('email')
  }

  return {
    setLoginStep,
    setRegisterStep,
    step,
    onSubmit,
    email,
    isPending,
    setStep,
    control,
  }
}
