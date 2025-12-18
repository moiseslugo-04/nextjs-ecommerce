import IdentifyForm from '@/components/features/auth/identify/IdentifyForm'
import { Suspense } from 'react'
export default function IdentifyPage() {
  return (
    <Suspense>
      <IdentifyForm />
    </Suspense>
  )
}
