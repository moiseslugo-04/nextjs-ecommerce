import { ReactNode } from 'react'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <section className='min-h-screen flex flex-col   items-center bg-linear-to-b from-gray-200 to-blue-200 py-10 px-4'>
      {/* Top Navigation */}
      {children}
    </section>
  )
}
