import EmailConfirmationCard from '@/components/EmailConfirmationCard'
import prisma from '@/lib/client'
import { redirect } from 'next/navigation'
export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>
}) {
  const { token } = await searchParams
  if (!token) {
    return redirect('/auth')
  }

  const record = await prisma.verificationToken.findFirst({
    where: { value: token },
  })

  if (!record)
    return (
      <div className='max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl border'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
          Invalid or expired link
        </h2>

        <p className='text-gray-600 mb-6'>
          Your verification link is invalid or has expired. Enter your email and
          we’ll send you a new verification link.
        </p>

        <form
          action='/api/auth/resend-verification'
          method='POST'
          className='space-y-4'
        >
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            className='w-full border rounded-lg px-4 py-2'
            required
          />

          <button
            type='submit'
            className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800'
          >
            Send new verification email
          </button>
        </form>
      </div>
    )

  if (record.expiresAt < new Date()) {
    prisma.verificationToken.delete({ where: { id: record.id } })
    return <EmailConfirmationCard email={record.identifier} />
  }

  await prisma.user.update({
    where: { id: record.userId },
    data: { emailVerified: true },
  })

  //remove token
  await prisma.verificationToken.delete({ where: { id: record.id } })

  return <p>Email verified! you can now log in</p>
}
