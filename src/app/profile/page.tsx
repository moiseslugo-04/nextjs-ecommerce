export default function ProfilePage() {
  return (
    <main className='flex items-center justify-center min-h-screen bg-neutral-100 p-6'>
      <section className='bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg border border-neutral-200'>
        <h1 className='text-3xl font-semibold text-neutral-900 text-center'>
          User Profile
        </h1>

        <p className='text-neutral-600 text-center mt-3'>
          This area is currently being developed.
        </p>

        <p className='text-neutral-500 text-center text-sm mt-1'>
          Soon you will be able to update your personal information here.
        </p>

        <div className='flex flex-col items-center mt-8'>
          <div className='w-12 h-12 rounded-full border-4 border-neutral-300 border-t-transparent animate-spin'></div>
          <span className='text-neutral-500 text-sm mt-3'>
            Loading profile features…
          </span>
        </div>
      </section>
    </main>
  )
}
