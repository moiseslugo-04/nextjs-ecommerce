'use client'
import { ArrowRight } from 'lucide-react'
import { FormProvider } from 'react-hook-form'
import { FieldGroup } from '@components/ui/field'
import { Button } from '@components/ui/button'
import { useRegister } from '@/lib/features/auth/client/hooks/useRegister'
import EmailConfirmationCard from '@components/EmailConfirmationCard'
import { cn } from '@lib/ui/utils'
import { AppLink } from '@/components/shared/AppLink'
import { FormCard } from '@/components/shared/FormCard'
import { FormField } from '@/components/shared/FormField'
export function RegisterForm({ email }: { email: string }) {
  const { isLoading, onSubmit, methods, success } = useRegister(email)
  return (
    <>
      {success ? (
        <EmailConfirmationCard email={email} />
      ) : (
        <FormProvider {...methods}>
          <FormCard
            title='Create Account'
            description='Join the Gechis Community'
            onSubmit={onSubmit}
            footer={
              <>
                <Button
                  type='submit'
                  disabled={isLoading}
                  className={cn('w-full py-6 font-medium $', {
                    isLoading: 'opacity-70 cursor-not-allowed',
                  })}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  {!isLoading && <ArrowRight className='ml-2 h-5 w-5' />}
                </Button>

                <div className='text-center text-gray-600'>
                  Already have an account?
                  <AppLink
                    variant={'link'}
                    href={'/auth/login'}
                    className='ml-2 font-medium text-gechis-gold hover:text-gechis-gold-dark'
                  >
                    Login
                  </AppLink>
                </div>
              </>
            }
          >
            <FieldGroup>
              <FormField name='name' label='Name' placeholder='Moises Lugo' />
              <FormField
                name='username'
                label='Username'
                placeholder='moisesDev'
              />
              <FormField
                name='email'
                label='Email'
                placeholder='moiseslugo9134@gmail.com'
              />
              <FormField name='password' label='Password' type='password' />
              <FormField
                name='confirmPassword'
                label='Confirm Password'
                type='password'
              />
            </FieldGroup>
          </FormCard>
        </FormProvider>
      )}
    </>
  )
}
