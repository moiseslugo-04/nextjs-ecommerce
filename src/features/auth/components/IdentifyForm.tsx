'use client'
import { CardContent, CardHeader } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { FieldControl } from '@/components/shared/FieldControl'
import { Controller } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { GoogleButton } from '@/features/auth/components/GoogleButton'
import { AuthLegalFooter } from './ AuthLegalFooter'
import { useIdentify } from '@/features/auth/hooks/useIdentify'
import { useSearchParams } from 'next/navigation'
export default function IdentifyForm() {
  const params = useSearchParams()
  const { onSubmit, control, isPending } = useIdentify()
  const [googleLoading, setGoogleLoading] = useState(false)
  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    await signIn('google', { redirectTo: params.get('callback') ?? '/' })
  }
  return (
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
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState }) => (
              <FieldControl
                field={field}
                fieldState={fieldState}
                label='Email'
                placeholder='example@gmail.com'
              />
            )}
          />
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
        <GoogleButton onClick={handleGoogleLogin} isLoading={googleLoading} />
      </CardContent>
      <AuthLegalFooter />
    </>
  )
}
