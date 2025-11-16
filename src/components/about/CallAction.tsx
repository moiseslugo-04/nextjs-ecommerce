import Link from 'next/link'
export default function CallAction() {
  return (
    <section className='py-20 px-4 bg-gechis-blue text-white mt-auto'>
      <div className='container-custom text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6'>
          Experience the Future of Shopping
        </h2>
        <p className='text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90'>
          Join <strong>Gechis</strong> — a new generation of online shopping
          built around transparency, quality, and community. Discover products
          that make your life easier, smarter, and more sustainable.
        </p>
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Link
            href='/register'
            className='bg-white text-gechis-blue font-semibold px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition-all'
          >
            Start Shopping
          </Link>
          <Link
            href='/'
            className='border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all'
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  )
}
