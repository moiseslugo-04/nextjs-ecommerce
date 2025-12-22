import { ReactNode } from 'react'
import { Card } from '@components/ui/card'
export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <Card className='flex items-center justify-center  w-full max-w-md  border border-neutral-100 shadow-xl rounded-2xl  mx-4 mt-12 '>
      {children}
    </Card>
  )
}
