import { AuthCard } from '@/components/features/auth/components/AuthCard'
import { AuthHeader } from '@/components/features/auth/components/AuthHeader'
import { ReactNode } from 'react'
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className='flex items-center flex-col min-h-screen min-w-screen bg-linear-to-b from-gray-200 to-blue-200 py-10 px-4 gap-20'>
      {/* Top Navigation */}
      <AuthHeader />
      <AuthCard>{children}</AuthCard>
    </section>
  )
}
