import { RegisterForm } from '@/components/RegisterForm'
import { Card, CardHeader } from '@components/ui/card'
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>
}) {
  const { email } = await searchParams
  return (
    <Card className='w-full max-w-md bg-white border border-neutral-100 shadow-xl rounded-2xl  mx-4 mt-12 '>
      {/* HEADER */}
      <CardHeader className='text-center my-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Create Account</h1>
        <p className='text-sm text-neutral-500 mt-1'>
          Join the Gechis Community
        </p>
      </CardHeader>
      {/* FORM */}
      <RegisterForm email={email ?? ''} />
    </Card>
  )
}
