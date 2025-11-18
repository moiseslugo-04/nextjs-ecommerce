'use client'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { FieldControl } from '@components/FieldControl'
import { Controller } from 'react-hook-form'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRegister } from '@/hooks/useRegister'

export default function RegisterPage() {
  const { onSubmit, control, setShowPassword, showPassword, isLoading } =
    useRegister()
  return (
    <Card className='border-none  max-w-[550px] w-full rounded-2xl overflow-hidden'>
      <CardHeader className='w-full flex  bg-gechis-blue p-6 text-white text-center mb-4'>
        <h1 className='text-2xl font-bold'>Create Account</h1>
        <p className='text-gray-300 mt-1'>Join the Gechis Community</p>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <FieldGroup>
            <Controller
              name='name'
              control={control}
              render={({ field, fieldState }) => (
                <FieldControl
                  field={field}
                  fieldState={fieldState}
                  label='Name'
                  placeholder='Moises Lugo'
                />
              )}
            />
            <Controller
              name='lastName'
              control={control}
              render={({ field, fieldState }) => (
                <FieldControl
                  field={field}
                  fieldState={fieldState}
                  label='Last Name'
                  placeholder='Lugo'
                />
              )}
            />

            <Controller
              name='email'
              control={control}
              render={({ field, fieldState }) => (
                <FieldControl
                  field={field}
                  fieldState={fieldState}
                  label='Email'
                  placeholder='moiseslugo9134@gamil.com'
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <Field className='relative'>
                  <FieldLabel className='flex flex-col items-start'>
                    <span>Password</span>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      className='input-field pr-10'
                      placeholder='********'
                      required
                    />
                    <Button
                      type='button'
                      className='absolute right-2 top-11 transform -translate-y-1/2 text-gray-500'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name='confirmPassword'
              control={control}
              render={({ field, fieldState }) => (
                <Field className='relative'>
                  <FieldLabel className='flex flex-col items-start'>
                    <span>Confirm Password</span>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      className='input-field pr-10'
                      placeholder='********'
                      required
                    />
                    <Button
                      type='button'
                      className='absolute right-2 top-11 transform -translate-y-1/2 text-gray-500'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <Button
            type='submit'
            className={`btn-primary w-full ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
            {!isLoading && <ArrowRight className='ml-2 h-5 w-5' />}
          </Button>
          <div className='mt-6 text-center text-gray-600'>
            Do you already have an account?{' '}
            <Link
              href='/auth/login'
              className='text-gechis-gold hover:text-gechis-gold-dark font-medium ml-2'
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
