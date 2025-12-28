import { AppLink } from '@/components/shared/AppLink'
import { CardFooter } from '@/components/ui/card'
export function AuthLegalFooter() {
  return (
    <CardFooter className='text-center text-xs text-neutral-500 px-6 pb-6'>
      <p className='leading-relaxed'>
        By continuing, you agree to our
        <AppLink
          className='font-normal'
          size={'sm'}
          variant={'link'}
          href='https://github.com/moiseslugo-04'
        >
          Terms of Service
        </AppLink>
        and
        <AppLink
          size={'sm'}
          variant={'link'}
          className='font-normal'
          href='https://github.com/moiseslugo-04'
        >
          Privacy Policy .
        </AppLink>
      </p>
    </CardFooter>
  )
}
