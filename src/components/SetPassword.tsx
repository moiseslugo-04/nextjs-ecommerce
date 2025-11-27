'use client'
import { Card, CardHeader, CardContent, CardFooter } from '@components/ui/card'
import { PasswordInput } from '@components/PasswordInput'
import { Controller, useForm } from 'react-hook-form'
import { resetPasswordSchema, ResetPasswordSchema } from '@/schemas/user'
import { Button } from '@components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useTransition } from 'react'
import { setPasswordAction } from '@/lib/features/auth/credentials/actions/reset-password.action'
import { toast } from 'sonner'
export function SetPassword({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition()
  const { handleSubmit, control } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  })
  const onSubmit = handleSubmit((data: ResetPasswordSchema) => {
    startTransition(async () => {
      try {
        const result = await setPasswordAction(data.password, userId)
        if (result?.success) {
          toast('Password update with success')
        }
      } catch (error) {
        console.log(error, 'unexpected error')
      }
    })
  })
  return (
    <Card className='max-w-md w-full bg-white rounded-2xl shadow-lg border border-neutral-200'>
      <CardHeader className='text-center my-4'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Create new password
        </h1>
        <p className='text-sm text-neutral-500 mt-1'>
          Enter your new password below
        </p>
      </CardHeader>

      <form onSubmit={onSubmit}>
        <CardContent className='space-y-4 pt-6'>
          <Controller
            name='password'
            control={control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label='New password'
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label='Confirm password'
                field={field}
                fieldState={fieldState}
              />
            )}
          />
        </CardContent>

        <CardFooter className='flex flex-col gap-4 pb-8'>
          <Button
            type='submit'
            className='w-full py-6 font-medium cursor-pointer'
            disabled={isPending}
          >
            {isPending ? 'Resetting...' : 'Reset password'}
          </Button>

          <Link href='/auth' className='w-full'>
            <Button variant='outline' className='w-full'>
              Back to login
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
