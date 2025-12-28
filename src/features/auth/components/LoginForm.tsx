'use client'
import { ArrowRight } from 'lucide-react'
import { FieldGroup } from '@components/ui/field'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { FormProvider } from 'react-hook-form'
import { Button } from '@components/ui/button'
import { AppLink } from '@/components/shared/AppLink'
import { FormCard } from '@/components/shared/FormCard'
import { FormField } from '@/components/shared/FormField'
export function LoginForm({ email }: { email?: string }) {
  const { onSubmit, methods, isLoading } = useLogin(email)
  return (
    <FormProvider {...methods}>
      <FormCard
        onSubmit={onSubmit}
        title='Welcome back'
        description='Log in to your account'
        footer={
          <>
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
          </>
        }
      >
        <FieldGroup>
          <FormField
            name='identifier'
            placeholder='you@example.com'
            label='Email or Username'
            type='text'
          />
          <FormField name='password' label='password' type='password' />
        </FieldGroup>
      </FormCard>
    </FormProvider>
  )
}
