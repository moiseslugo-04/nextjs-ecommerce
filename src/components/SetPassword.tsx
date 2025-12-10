'use client'
import { Card, CardHeader, CardContent, CardFooter } from '@components/ui/card'
import { PasswordInput } from '@components/shared/PasswordInput'
import { Controller } from 'react-hook-form'
import { Button } from '@components/ui/button'
import { useSetPassword } from '@features/auth/client/hooks/useSetPassword'
export function SetPassword({ userId }: { userId: string }) {
  const { onSubmit, control, isPending } = useSetPassword({ userId })
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
            className='w-full py-6 font-medium cursor-pointer bg-gray-300 rounded-md hover:bg-gray-400'
            disabled={isPending}
          >
            {isPending ? 'Resetting...' : 'Reset password'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
