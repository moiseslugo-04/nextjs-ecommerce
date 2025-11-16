import Link from 'next/link'
export default function Products() {
  return (
    <div>
      <h3 className='text-lg font-semibold mb-6'>Products</h3>
      <ul className='space-y-4'>
        <li>
          <Link
            href='/market'
            className='text-gray-300 hover:text-gechis-gold transition duration-300'
          >
            GechisMarket
          </Link>
        </li>
        <li>
          <Link
            href='/beauty'
            className='text-gray-300 hover:text-gechis-gold transition duration-300'
          >
            GechisBeauty
          </Link>
        </li>
        <li>
          <Link
            href='/fashion'
            className='text-gray-300 hover:text-gechis-gold transition duration-300'
          >
            GechisFashion
          </Link>
        </li>
      </ul>
    </div>
  )
}
