import Image from 'next/image'
import Link from 'next/link'
export default function Logo() {
  return (
    <Link href={'/'} className='flex gap-2 items-center'>
      <div className='flex items-center justify-center w-10 h-10 rounded-full bg-white  text-gechis-blue relative'>
        <Image
          src={'/logo.svg'}
          fill
          sizes='50vh'
          alt='Logo Gechis'
          className='w-auto h-auto'
        />
      </div>

      <span className='font-display text-white text-xl  font-bold  '>
        Gechis
      </span>
    </Link>
  )
}
