import { validateVerificationToken } from '@features/verificationToken/verification-token.service'
import InvalidTokenCard from '@/components/InvalidTokenCard'
import { SetPassword } from '@/components/SetPassword'
import { Suspense } from 'react'
export default async function SetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>
}) {
  const { token } = await searchParams
  if (!token)
    return (
      <InvalidTokenCard
        title='Set your password'
        description='Enter your email and we’ll send a password set link.'
        type='set_password'
      />
    )
  const record = await validateVerificationToken(token)

  if (record.expired || !record?.token) {
    return <InvalidTokenCard type='set_password' />
  }
  return (
    <section className='min-w-screen min-h-screen flex justify-center items-center'>
      <div className='min-h-screen w-full flex items-center justify-center bg-linear-to-b from-gray-200 to-blue-200 py-10 px-4'>
        <Suspense fallback={<p>loading...</p>}>
          <SetPassword userId={record.token.userId} />
        </Suspense>
      </div>
    </section>
  )
}
