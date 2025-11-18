import Link from 'next/link'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className='min-h-screen flex flex-col justify-center items-center  bg-gray-50 p-4'>
      <Link
        href='/'
        className='self-start mb-6 text-gechis-blue hover:underline font-medium flex items-center gap-2'
      >
        ← Back to Home
      </Link>
      {children}
    </section>
  )
}
