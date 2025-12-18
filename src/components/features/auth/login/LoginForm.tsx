'use client'
import { ArrowRight } from 'lucide-react'
import { CardContent, CardFooter, CardHeader } from '@components/ui/card'
import { FieldGroup } from '@components/ui/field'
import { useLogin } from '@/lib/features/auth/client/hooks/useLogin'
import { Controller } from 'react-hook-form'
import { Button } from '@components/ui/button'
import { FieldControl } from '@components/FieldControl'
import { PasswordInput } from '@/components/shared/PasswordInput'
import { AppLink } from '@/components/shared/AppLink'

export function LoginForm({ email }: { email?: string }) {
  const { onSubmit, control, isLoading } = useLogin(email)
  return (
    <form onSubmit={onSubmit}>
      <CardHeader className='text-center my-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Welcome back</h1>
        <p className='text-sm text-neutral-500 mt-1'>Log in to your account</p>
      </CardHeader>

      <CardContent className='space-y-4 pt-6'>
        <FieldGroup>
          <Controller
            name='identifier'
            control={control}
            render={({ field, fieldState }) => (
              <FieldControl
                field={{
                  ...field,
                  disabled: !!email,
                }}
                fieldState={fieldState}
                placeholder='you@example.com'
                label='Email or Username'
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label='password'
                field={field}
                fieldState={fieldState}
              />
            )}
          />
        </FieldGroup>
      </CardContent>

      <CardFooter className='flex flex-col gap-6 pb-8'>
        <Button
          type='submit'
          className='w-full py-6 font-medium cursor-pointer hover:bg-gray-200 transition  duration-300 ease-in-out'
          disabled={isLoading}
        >
          {isLoading ? (
            'Loading...'
          ) : (
            <div className='flex items-center justify-center gap-2'>
              Continue <ArrowRight className='h-5 w-5' />
            </div>
          )}
        </Button>

        <div className='flex flex-col justify-center items-center'>
          <p className='text-center text-sm text-neutral-600'>
            Don’t have an account?{' '}
            <AppLink
              href={'/auth/identify/'}
              variant={'link'}
              size={'sm'}
              className='text-gechis-gold hover:underline font-medium'
            >
              Sign up
            </AppLink>
          </p>
          <AppLink
            href={'/auth/verify/reset-password'}
            variant={'link'}
            size={'sm'}
            className='text-center text-sm underline font-normal text-blue-700'
          >
            Forget my password
          </AppLink>
        </div>
      </CardFooter>
    </form>
  )
}
