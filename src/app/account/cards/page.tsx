export default function CreditCardList() {
  return (
    <main className='flex items-center justify-center min-h-screen bg-neutral-100 p-6'>
      <section className='bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg border border-neutral-200'>
        <h1 className='text-3xl font-semibold text-neutral-900 text-center'>
          Cart Pages
        </h1>

        <p className='text-neutral-600 text-center mt-3'>
          This area is currently being developed.
        </p>

        <p className='text-neutral-500 text-center text-sm mt-1'>
          You will soon be able to complete your payment information here.
        </p>

        <div className='flex flex-col items-center mt-8'>
          <div className='w-12 h-12 rounded-full border-4 border-neutral-300 border-t-transparent animate-spin' />
          <span className='text-neutral-500 text-sm mt-3'>
            Loading Cards features…
          </span>
        </div>
      </section>
    </main>
  )
}

/* import { CardItem } from '@/components/shared/CardItem'
export default function CreditCardList() {
  const cards = [
    {
      id: 'card_1',
      brand: 'visa',
      last4: '4242',
      holderName: 'Moises Lugo',
      expMonth: 12,
      expYear: 2027,
      isDefault: true,
    },
    {
      id: 'card_2',
      brand: 'mastercard',
      last4: '5454',
      holderName: 'Moises Lugo',
      expMonth: 8,
      expYear: 2026,
      isDefault: false,
    },
  ]

  const isEmpty = cards.length === 0
  return (
    <section className='space-y-6 p-4'>
      <header className='flex items-center justify-between gap-3'>
        <h2 className='text-lg font-semibold'>Payment Methods</h2>
        <button className='rounded-md border px-4 py-2 text-sm'>
          Add card
        </button>
      </header>

      {isEmpty && (
        <div className='rounded-md border p-6 text-sm text-gray-500'>
          You don’t have any saved cards yet.
        </div>
      )}
      <ul className='space-y-4'>
        {cards.map((card) => (
          <CardItem key={card.id} {...card} />
        ))}
      </ul>
    </section>
  )
}

 */
