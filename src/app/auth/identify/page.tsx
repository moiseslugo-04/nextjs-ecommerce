import IdentifyForm from '@/features/auth/components/IdentifyForm'
import { Suspense } from 'react'
export default function IdentifyPage() {
  return (
    <Suspense>
      <IdentifyForm />
    </Suspense>
  )
}
