export function NotFound({ message }: { message?: string }) {
  return (
    <section className='flex flex-col items-center justify-center text-center gap-3 min-h-[50dvh]'>
      <h1 className='text-2xl font-semibold'>Page Not Found</h1>

      <p className='text-5xl font-bold text-gray-400'>404</p>

      {message && <p className='text-gray-600 max-w-md'>{message}</p>}
    </section>
  )
}
