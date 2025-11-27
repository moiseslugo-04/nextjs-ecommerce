import { validateVerificationToken } from '@features/verificationToken/verification-token.service'
import InvalidTokenCard from '@/components/InvalidTokenCard'
import { ResetPasswordPage } from '@/components/ResetPasswordPage'
import { Suspense } from 'react'
export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>
}) {
  const { token } = await searchParams
  if (!token)
    return (
      <InvalidTokenCard
        title='Reset your password'
        description='Enter your email and we’ll send a password reset link.'
        type='reset_password'
      />
    )
  const record = await validateVerificationToken(token)

  if (record.expired || !record?.token) {
    return <InvalidTokenCard type='reset_password' />
  }
  return (
    <section className='min-w-screen min-h-screen flex justify-center items-center'>
      <div className='min-h-screen w-full flex items-center justify-center bg-linear-to-b from-gray-200 to-blue-200 py-10 px-4'>
        <Suspense fallback={<p>loading...</p>}>
          <ResetPasswordPage userId={record.token.userId} />
        </Suspense>
      </div>
    </section>
  )
}
