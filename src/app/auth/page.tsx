import AuthPage from '@components/authPage'
import { Suspense } from 'react'

export default function AuthPageWrapper() {
  return (
    <Suspense>
      <AuthPage />
    </Suspense>
  )
}
