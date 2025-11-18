'use client'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/ui/field'
import { useLogin } from '@/hooks/useLogin'
import Link from 'next/link'
import { Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FieldControl } from '@/components/FieldControl'

export default function LoginPage() {
  const { onSubmit, control, isLoading, handleShowPassword, showPassword } =
    useLogin()
  return (
    <Card className='max-w-[450px] w-full bg-white rounded-xl shadow-md overflow-hidden gap-2 border-none'>
      <CardHeader className='bg-gechis-blue  text-white text-center mb-4'>
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <p className='text-gray-300 mt-1'>Log in to your account</p>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <FieldGroup>
            <Controller
              name='identifier'
              control={control}
              render={({ field, fieldState }) => (
                <FieldControl
                  field={field}
                  fieldState={fieldState}
                  placeholder='user or user@gmail.com'
                  label='Username or Email'
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className='flex flex-col gap-2 items-start relative'>
                    Password
                    <Input
                      className='input-field relative'
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      aria-invalid={fieldState.invalid}
                      placeholder='*****************'
                    />
                    <button
                      type='button'
                      className='absolute top-11 right-3 transform -translate-y-1/2 text-gray-500'
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className='flex flex-col'>
          <Button
            type='submit'
            className={`btn-primary w-full ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading && 'Lading...'}
            {!isLoading && <ArrowRight className='ml-2 h-5 w-5' />}
          </Button>

          <div className='mt-6 text-center text-gray-600'>
            Do not have an account yet?{' '}
            <Link
              href='/auth/register'
              className='text-gechis-gold hover:text-gechis-gold-dark font-medium'
            >
              Sign up!
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
