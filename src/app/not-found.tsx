import { NotFound } from '@/components/NotFound'

export default function NotFoundPage() {
  return (
    <section className='min-h-screen w-full flex justify-center items-center'>
      <NotFound />
      <button>Trying again</button>
    </section>
  )
}
