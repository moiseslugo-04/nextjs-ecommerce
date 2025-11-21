'use client'

import { ChangeEvent, FormEvent, useState, useTransition } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoginForm } from '@/components/LoginForm'
import { RegisterForm } from '@/components/RegisterForm'
import { registerSchema } from '@/schemas/user'
import { Field, FieldError } from '@/components/ui/field'
import { toast } from 'sonner'
import { checkEmail } from '@/lib/actions/user/checkEmail'
export type Steps = 'email' | 'login' | 'register'
export default function AuthPage() {
  const [step, setStep] = useState<Steps>('email')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<null | string>(null)
  const [isPending, startTransition] = useTransition()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    validEmail(value)
  }
  const validEmail = (email: string) => {
    const result = registerSchema.pick({ email: true }).safeParse({ email })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    setError(null)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const email = formData.get('email') as string
      validEmail(email)
      if (error) return
      setEmail(email)
      startTransition(async () => {
        const hasAccount = await checkEmail(email)
        if (hasAccount) {
          toast.warning('You already has an Account')
          setStep('login')
          return
        }
        setStep('register')
      })
    } catch (error) {
      console.log(error, 'error in server action')
    }
  }

  const setLoginStep = () => {
    setEmail('')
    setStep('login')
  }
  const setRegisterStep = () => {
    setEmail('')
    setStep('email')
  }
  return (
    <section className='min-h-screen flex flex-col   items-center bg-linear-to-b from-gray-200 to-blue-200 py-10 px-4'>
      {/* Top Navigation */}
      <div className='w-full max-w-4xl flex justify-between items-center px-2 pb-10  pt-5'>
        <Link href='/' className='text-gechis-blue hover:underline font-medium'>
          ← Home
        </Link>

        {step === 'email' && (
          <Button
            variant='outline'
            className='bg-white text-black hover:bg-neutral-100'
            onClick={() => setStep('login')}
          >
            Login
          </Button>
        )}

        {step === 'login' && (
          <Button
            variant='outline'
            className='bg-white text-black hover:bg-neutral-100'
            onClick={() => setStep('email')}
          >
            Register
          </Button>
        )}
      </div>

      {/* Auth Card */}
      <Card className='w-full max-w-md bg-white border border-neutral-100 shadow-xl rounded-2xl  mx-4 mt-12 '>
        {step === 'email' && (
          <>
            <CardHeader className='text-center space-y-2 my-4'>
              <h1 className='text-3xl font-bold tracking-tight'>
                Create your account
              </h1>
              <p className='text-sm text-neutral-600'>
                Enter your email address to get started.
              </p>
            </CardHeader>

            <CardContent className='space-y-5'>
              <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <Field>
                  <Input
                    name='email'
                    type='email'
                    onBlur={handleChange}
                    placeholder='example@gmail.com'
                    className='bg-neutral-100 border-none text-black py-6'
                  />
                  {error && <FieldError errors={[{ message: error }]} />}
                </Field>
                <Button
                  disabled={isPending}
                  className='w-full py-6 text-black cursor-pointer hover:bg-gray-300
               font-medium bg-gray-200 transition  duration-300 ease-in-out '
                >
                  {isPending ? 'Loading...' : 'Continue with Email'}
                </Button>
              </form>

              <div className='flex items-center gap-2 text-xs text-neutral-500'>
                <span className='flex-1 h-px bg-neutral-300'></span>
                <span className='uppercase tracking-widest'>or</span>
                <span className='flex-1 h-px bg-neutral-300'></span>
              </div>

              {/* Google Button */}
              <Button
                variant='outline'
                className='w-full py-6 flex items-center justify-center gap-3'
              >
                <svg width='22' height='22' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M22.5 12.2c0-.8-.1-1.6-.2-2.3H12v4.3h5.8c-.3 1.6-1.3 3-2.8 3.9v3.2h4.5c2.6-2.4 4-5.9 4-9.1z'
                    fill='#4285F4'
                  />
                  <path
                    d='M12 23c3.3 0 6-1.1 8-3l-4.5-3.2c-1.1.7-2.5 1.1-3.9 1.1C8.1 17.9 5.3 16 4.3 13H-.3v3.3C1.8 20.5 6.5 23 12 23z'
                    fill='#34A853'
                  />
                  <path
                    d='M4.3 13c-.3-.7-.5-1.4-.5-2.2s.2-1.5.5-2.2V5.3H-.3C-1 6.7-1.3 8.3-1.3 10c0 1.7.3 3.3 1 4.7L4.3 13z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M12 4.1c1.8 0 3.4.6 4.6 1.7l3.4-3.4C18 1.1 15.3 0 12 0 6.5 0 1.8 2.5-.3 6.7L4.3 10c1-2.9 3.8-5 7.7-5.9z'
                    fill='#EA4335'
                  />
                </svg>
                Continue with Google
              </Button>
            </CardContent>

            <CardFooter className='text-center text-xs text-neutral-500 px-6 pb-6'>
              <p className='leading-relaxed'>
                By continuing, you agree to our{' '}
                <Link
                  className='text-gechis-blue underline-offset-2 hover:underline'
                  href='https://github.com/moiseslugo-04'
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  className='text-gechis-blue underline-offset-2 hover:underline'
                  href='https://github.com/moiseslugo-04'
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </CardFooter>
          </>
        )}

        {step === 'login' && (
          <LoginForm changeStep={setRegisterStep} email={email} />
        )}
        {step === 'register' && (
          <RegisterForm changeStep={setLoginStep} email={email} />
        )}
      </Card>
    </section>
  )
}
