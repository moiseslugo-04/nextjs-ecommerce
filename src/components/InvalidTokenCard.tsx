'use client'

import { emailSchema, EmailSchema } from '@/lib/features/users/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { FieldControl } from './FieldControl'
import { Button } from '@components/ui/button'
import { useTransition, useState } from 'react'
import { VerificationTokenTypes } from '@/lib/features/auth/services/verification.service'
import { resendVerificationTokenByEmail } from '@/lib/features/auth/credentials/actions/resend-verification-token.action'
import Link from 'next/link'
interface InvalidCardProps {
  type: VerificationTokenTypes
  title?: string
  description?: string
}
export default function InvalidTokenCard({
  type,
  title = 'Invalid or expired link',
  description = 'Your verification link is invalid or has expired. Enter your email and we’ll send you a new verification link.',
}: InvalidCardProps) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const { control, handleSubmit } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(async (data: EmailSchema) => {
    setError('')
    setSent(false)
    startTransition(async () => {
      try {
        const result = await resendVerificationTokenByEmail(data.email, type)

        if (result?.code === 'USER_NOT_FOUND') {
          setError('User not found, please check your email and try again')
          return
        }
        setSent(true)
      } catch (error) {
        console.log(error)
      }
    })
  })
  return (
    <div className='max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl border'>
      <Link href={'/'} className='text-blue-500'>
        {'<-'} Go home
      </Link>
      <h2 className='text-2xl font-semibold text-gray-800 my-3'>{title}</h2>

      <p className='text-gray-600 mb-6'>{description}</p>
      {sent && (
        <div className='rounded-md border-l-4 pt-4 border-green-500 bg-green-50 p-3'>
          <p className='text-sm font-medium'>Sent — check your inbox</p>
          <p className='text-xs text-muted-foreground'>
            If you still do not see it, wait a few minutes.
          </p>
        </div>
      )}
      {error && (
        <div className='rounded-md border-l-4 border-red-500 bg-red-50 p-3'>
          <p className='text-sm font-medium'>Error</p>
          <p className='text-xs text-muted-foreground'>{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className='space-y-2'>
        <Controller
          name='email'
          control={control}
          render={(input) => (
            <FieldControl {...input} placeholder='example@gmial.com' />
          )}
        />

        <Button
          disabled={isPending}
          type='submit'
          className='w-full text-center bg-black text-white py-3 rounded-sm hover:bg-gray-800'
        >
          {isPending ? (
            <>
              <p>Sending email..</p>
            </>
          ) : (
            'Send new verification email'
          )}
        </Button>
      </form>
    </div>
  )
}
