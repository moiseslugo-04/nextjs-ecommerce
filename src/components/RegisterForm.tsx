import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card'
import { FieldControl } from '@components/FieldControl'
import { Controller } from 'react-hook-form'
import { FieldGroup } from '@components/ui/field'
import { Button } from '@components/ui/button'
import { useRegister } from '@/hooks/useRegister'
import EmailConfirmationCard from '@components/EmailConfirmationCard'
import { PasswordInput } from './PasswordInput'
import { cn } from '@lib/utils/ui/utils'
export function RegisterForm({
  changeStep,
  email,
}: {
  changeStep: () => void
  email: string
}) {
  const { isLoading, onSubmit, control, success } = useRegister(email)
  return (
    <Card className='max-w-[550px] w-full border-none rounded-2xl overflow-hidden'>
      {success ? (
        <EmailConfirmationCard email={email} />
      ) : (
        <>
          {/* HEADER */}
          <CardHeader className='text-center my-4'>
            <h1 className='text-3xl font-bold tracking-tight'>
              Create Account
            </h1>
            <p className='text-sm text-neutral-500 mt-1'>
              Join the Gechis Community
            </p>
          </CardHeader>

          {/* FORM */}
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
                  name='username'
                  control={control}
                  render={({ field, fieldState }) => (
                    <FieldControl
                      field={field}
                      fieldState={fieldState}
                      label='Username'
                      placeholder='moisesDev'
                    />
                  )}
                />

                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState }) => (
                    <FieldControl
                      field={{
                        ...field,
                        disabled: !!email,
                      }}
                      fieldState={fieldState}
                      label='Email'
                      placeholder='moiseslugo9134@gmail.com'
                    />
                  )}
                />

                <Controller
                  name='password'
                  control={control}
                  render={({ field, fieldState }) => (
                    <PasswordInput
                      label='Password'
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
                      label='Confirm Password'
                      field={field}
                      fieldState={fieldState}
                    />
                  )}
                />
              </FieldGroup>
            </CardContent>

            {/* FOOTER */}
            <CardFooter className='flex flex-col gap-3'>
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
                <Button
                  onClick={changeStep}
                  className='ml-2 font-medium text-gechis-gold hover:text-gechis-gold-dark'
                >
                  Login
                </Button>
              </div>
            </CardFooter>
          </form>
        </>
      )}
    </Card>
  )
}
