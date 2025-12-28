import { RegisterForm } from '@/features/auth/components/RegisterForm'
interface RegisterProps {
  searchParams: Promise<{ email: string }>
}
export default async function RegisterPage({ searchParams }: RegisterProps) {
  const { email } = await searchParams
  return <RegisterForm email={email ?? ''} />
}
