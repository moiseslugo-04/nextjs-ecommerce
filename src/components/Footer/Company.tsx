import Link from 'next/link'
export default function Company() {
  return (
    <div>
      <h3 className='text-lg font-semibold mb-6'>Enterprise</h3>
      <ul className='space-y-4'>
        <li>
          <Link
            href='/about'
            className='text-gray-300 hover:text-gechis-gold transition duration-300'
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href='https://mini-blog-seven-mocha.vercel.app/'
            className='text-gray-300 hover:text-gechis-gold transition duration-300'
          >
            Blog
          </Link>
        </li>
      </ul>
    </div>
  )
}
