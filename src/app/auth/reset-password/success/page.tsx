import { SetPassword } from '@/components/SetPassword'
import { Loading } from '@/components/shared/Loading'
import { Suspense } from 'react'

interface Props {
  searchParams: Promise<{ userId: string }>
}
export default async function ResetPasswordPage({ searchParams }: Props) {
  const { userId } = await searchParams

  return (
    <Suspense fallback={<Loading image text='loading...' />}>
      <SetPassword userId={userId} />
    </Suspense>
  )
}
