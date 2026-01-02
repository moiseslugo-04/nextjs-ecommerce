import { Spinner } from '@/components/ui/spinner'
import Image from 'next/image'

export default function LoadingAuth() {
  return (
    <div className='min-h-90 min-w-50 flex flex-col justify-center items-center gap-2'>
      <Image
        priority
        unoptimized
        src='/logo.svg'
        width={100}
        height={100}
        alt='Logo Gechis'
      />
      <p className='text-lg font-bold text-muted-foreground '>
        Loading Auth...
      </p>
      <Spinner className='mt-2 text-gechis-accent' />
    </div>
  )
}
