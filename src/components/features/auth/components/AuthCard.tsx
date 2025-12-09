import { ReactNode } from 'react'
import { Card } from '@components/ui/card'
export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <Card className='w-full max-w-md bg-white border border-neutral-100 shadow-xl rounded-2xl  mx-4 mt-12 '>
      {children}
    </Card>
  )
}
