import { LoginForm } from '@/components/LoginForm'
import { Card, CardHeader } from '@components/ui/card'
import Link from 'next/link'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>
}) {
  const { email } = await searchParams
  return (
    <>
      <div className='w-full max-w-4xl flex justify-between items-center px-2 pb-10  pt-5'>
        <Link href='/' className='text-gechis-blue hover:underline font-medium'>
          ← Home
        </Link>

        <Link
          className='bg-white text-black hover:bg-neutral-100 p-1 rounded-md'
          href={'/auth/identify'}
        >
          Register
        </Link>
      </div>

      <Card className='w-full max-w-md bg-white border border-neutral-100 shadow-xl rounded-2xl  mx-4 mt-12 '>
        <CardHeader className='text-center my-4'>
          <h1 className='text-3xl font-bold tracking-tight'>Welcome back</h1>
          <p className='text-sm text-neutral-500 mt-1'>
            Log in to your account
          </p>
        </CardHeader>
        <LoginForm email={email ?? ''} />
      </Card>
    </>
  )
}

/*   */
