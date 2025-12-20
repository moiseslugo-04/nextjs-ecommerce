import Link from 'next/link'

export default function AdminPage() {
  return (
    <main className='flex items-center justify-center min-h-screen bg-neutral-100 p-6'>
      <section className='bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg border border-neutral-200'>
        <h1 className='text-3xl font-semibold text-neutral-900 text-center'>
          Admin page
        </h1>

        <p className='text-neutral-600 text-center mt-3'>
          This area is currently being developed.
        </p>

        <p className='text-neutral-500 text-center text-sm mt-1'>
          You will soon be able to handle the system
        </p>

        <div className='flex flex-col items-center mt-8'>
          <div className='w-12 h-12 rounded-full border-4 border-neutral-300 border-t-transparent animate-spin' />
          <span className='text-neutral-500 text-sm mt-3'>
            Loading Admin features…
          </span>
        </div>

        <div className='flex justify-center mt-8'>
          <Link
            href='/'
            className='px-5 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 transition'
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
