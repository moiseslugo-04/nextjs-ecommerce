import Image from 'next/image'
import { Spinner } from '@/components/ui/spinner'

export function Loading({ image, text }: { image?: boolean; text?: string }) {
  return (
    <div className=' w-screen h-screen flex flex-col items-center justify-center gap-4 bg-background'>
      <div className='flex flex-col items-center gap-2'>
        {image && (
          <Image
            priority
            unoptimized
            src='/logo.svg'
            width={100}
            height={100}
            alt='Logo Gechis'
          />
        )}

        <p className='text-lg font-bold text-muted-foreground '>
          {text ?? 'Loading your store...'}
        </p>
        <Spinner className='mt-2 text-gechis-accent' />
      </div>
    </div>
  )
}
