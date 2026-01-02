// app/auth/verify-email/route.ts
import { deleteVerificationToken } from '@/features/auth/repository/verification-token-repository'
import { validateVerificationToken } from '@/features/auth/services/verification-token.service'
import { markEmailAsVerified } from '@/features/users/user.repository'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token')

  if (!token) redirect('/auth/verify-email/invalid-token')

  const result = await validateVerificationToken(token)

  if (!result.success || !result.token) {
    redirect('/auth/verify-email/invalid-token')
  }

  await markEmailAsVerified(result.token.userId)
  await deleteVerificationToken(token)

  redirect('/auth/verify-email/success')
}
