'use client'
import { useState, useTransition } from 'react'
import { resendVerificationTokenByEmail } from '@features/auth/resend-verification-token.action'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@components/ui/card'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { Badge } from '@components/ui/badge'
import { Input } from '@components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'

type Props = {
  email: string
  confirmUrl?: string // optional: direct confirmation link
}

export default function EmailConfirmationCard({ email, confirmUrl }: Props) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  async function handleResend() {
    setError(null)
    try {
      startTransition(async () => {
        await resendVerificationTokenByEmail(email, 'email_verification')
      })
      toast.success('Email sent', {
        description: `Confirmation sent to ${email}`,
      })
      setSent(true)
    } catch (err) {
      console.error(err)
      const message = err instanceof Error ? err?.message : 'Failed to send'
      setError(message)
      toast.error('Error', { description: message })
    }
  }

  return (
    <div className='max-w-xl mx-auto p-4'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-lg'>Confirm your email</CardTitle>
              <CardDescription>
                We sent a confirmation link to{' '}
                <span className='font-medium'>{email}</span>. Open the email and
                click the button to activate your account.
              </CardDescription>
            </div>
            <Badge variant='secondary'>Action required</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className='space-y-4'>
            <div className='rounded-md border p-3 bg-muted'>
              <p className='text-sm'>
                If you did not receive the email, click {'Resend'} below.
              </p>
              <p className='text-xs text-muted-foreground mt-2'>
                Check your spam folder too.
              </p>
            </div>

            <Separator />

            {confirmUrl ? (
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium'>
                  Direct confirmation link
                </label>
                <Input readOnly value={confirmUrl} />
                <p className='text-xs text-muted-foreground'>
                  You can paste this link in the browser.
                </p>
              </div>
            ) : (
              <div className='text-sm text-muted-foreground'>
                The confirmation link is included in the email we sent. We do
                not expose it here for security reasons unless your server
                returns it.
              </div>
            )}

            {sent && (
              <div className='rounded-md border-l-4 border-green-500 bg-green-50 p-3'>
                <p className='text-sm font-medium'>Sent — check your inbox</p>
                <p className='text-xs text-muted-foreground'>
                  If you still do not see it, wait a few minutes.
                </p>
              </div>
            )}

            {error && (
              <div className='rounded-md border-l-4 border-red-500 bg-red-50 p-3'>
                <p className='text-sm font-medium'>Error</p>
                <p className='text-xs text-muted-foreground'>{error}</p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Link href={'/auth?step=login'} className='text-blue-500'>
              {'<-'} Back to login
            </Link>
          </div>

          <div className='flex items-center gap-2'>
            <Button size='sm' disabled={isPending} onClick={handleResend}>
              {isPending ? 'Sending...' : 'Resend confirmation'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
