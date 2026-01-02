import RedirectWithCountdown from '@/components/RedirectWithCountdown'

export default async function VerifyEmailPage() {
  return (
    <section className='min-w-screen min-h-80 flex justify-center items-center'>
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
