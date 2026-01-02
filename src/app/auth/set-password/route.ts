import { deleteVerificationToken } from '@/features/auth/repository/verification-token-repository'
import { validateVerificationToken } from '@/features/auth/services/verification-token.service'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token')
  if (!token) redirect('/auth/set-password/invalid-token')

  const result = await validateVerificationToken(token)
  if (!result.success || !result.token)
    redirect('/auth/set-password/invalid-token')
  await deleteVerificationToken(token)
  redirect(`/auth/set-password/success/?userId=${result.token.userId}`)
}
