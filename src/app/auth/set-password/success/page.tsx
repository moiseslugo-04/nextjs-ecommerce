import { SetPassword } from '@/components/SetPassword'
import { Loading } from '@/components/shared/Loading'
import { Suspense } from 'react'
interface Props {
  searchParams: Promise<{ userId: string }>
}
export default async function SetPasswordPage({ searchParams }: Props) {
  const { userId } = await searchParams
  return (
    <Suspense fallback={<Loading image text='Loading Form....' />}>
      <SetPassword userId={userId} />
    </Suspense>
  )
}
