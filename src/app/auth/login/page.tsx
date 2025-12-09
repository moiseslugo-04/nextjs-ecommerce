import { LoginForm } from '@/components/features/auth/login/LoginForm'
interface LoginProps {
  searchParams: Promise<{ email: string }>
}
export default async function LoginPage({ searchParams }: LoginProps) {
  const { email } = await searchParams
  return <LoginForm email={email} />
}
