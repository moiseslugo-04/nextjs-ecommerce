import { CardItem } from '@/components/features/account/CardItem'
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
