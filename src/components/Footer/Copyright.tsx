import Link from 'next/link'
export default function Copyright() {
  return (
    <div className='mt-12 pt-8 border-t border-gray-700'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='flex space-x-6 flex-wrap items-center justify-center'>
          <Link
            href='#'
            className='text-gray-400 hover:text-gechis-gold transition duration-300'
          >
            Terms of service
          </Link>
          <Link
            href='#'
            className='text-gray-400 hover:text-gechis-gold transition duration-300'
          >
            Privacy policy
          </Link>
          <Link
            href='#'
            className='text-gray-400 hover:text-gechis-gold transition duration-300'
          >
            Cookies
          </Link>
        </div>
        <p className='text-gray-400 mt-4 md:mb-0'>
          &copy; {new Date().getFullYear()} Gechis. All rights reserved.
        </p>
      </div>
    </div>
  )
}
