import Logo from '@/components/shared/Logo'
import { Facebook, Twitter, GithubIcon, Linkedin } from 'lucide-react'

export default function Media() {
  return (
    <div className='flex gap-6  items-center'>
      <Logo />
      <div className='flex gap-3 items-center'>
        <a
          href='https://facebook.com'
          aria-label='Facebook'
          className='text-gray-400 hover:text-gechis-gold transition-colors duration-300'
        >
          <Facebook size={22} />
        </a>
        <a
          href='https://twitter.com'
          aria-label='Twitter'
          className='text-gray-400 hover:text-gechis-gold transition-colors duration-300'
        >
          <Twitter size={22} />
        </a>
        <a
          href='https://github.com/moiseslugo-04'
          aria-label='GitHub'
          className='text-gray-400 hover:text-gechis-gold transition-colors duration-300'
        >
          <GithubIcon size={22} />
        </a>
        <a
          href='https://www.linkedin.com/in/moises-lugo-352b892a4/'
          aria-label='LinkedIn'
          className='text-gray-400 hover:text-gechis-gold transition-colors duration-300'
        >
          <Linkedin size={22} />
        </a>
      </div>
    </div>
  )
}
