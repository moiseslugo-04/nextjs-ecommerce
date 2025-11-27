import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card'
import { FieldGroup } from '@components/ui/field'
import { useLogin } from '@/hooks/useLogin'
import { Controller } from 'react-hook-form'
import { Button } from '@components/ui/button'
import { FieldControl } from '@components/FieldControl'
import { PasswordInput } from './PasswordInput'
import Link from 'next/link'
interface LoginFormProps {
  changeStep: () => void
  email: string
}
export function LoginForm({ changeStep, email }: LoginFormProps) {
  const { onSubmit, control, isLoading } = useLogin(email)
  return (
    <Card className='max-w-md w-full bg-white rounded-2xl shadow-lg border border-neutral-200'>
      <CardHeader className='text-center my-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Welcome back</h1>
        <p className='text-sm text-neutral-500 mt-1'>Log in to your account</p>
      </CardHeader>

      <form onSubmit={onSubmit}>
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
              <button
                type='button'
                className='text-gechis-gold hover:underline font-medium'
                onClick={changeStep}
              >
                Sign up
              </button>
            </p>
            <Link
              href={'/verify/reset-password'}
              className='text-center text-sm underline text-blue-700'
            >
              Forget my password
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
