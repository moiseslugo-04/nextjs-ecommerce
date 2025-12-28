import { validateVerificationToken } from '@/features/auth/services/verification-token.service'
import { updateVerifiedEmail } from '@features/users/user.repository'
import RedirectWithCountdown from '@/components/RedirectWithCountdown'
import InvalidTokenCard from '@/components/InvalidTokenCard'
export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>
}) {
  const { token } = await searchParams
  if (!token) return <InvalidTokenCard type='email_verification' />

  const record = await validateVerificationToken(token)

  if (record.expired || !record?.token) {
    return <InvalidTokenCard type='email_verification' />
  }
  await updateVerifiedEmail(record.token.userId)
  return (
    <section className='min-w-screen min-h-screen flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-3xl font-semibold text-green-600'>
          Email verified!
        </h1>
        <p className='mt-2 text-gray-700'>You can now log in.</p>

        <RedirectWithCountdown to='/auth/login' seconds={5} />
      </div>
    </section>
  )
}
