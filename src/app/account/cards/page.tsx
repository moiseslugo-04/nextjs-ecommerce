import { AccountSection } from '@/components/features/account/AccountSection'
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
  return (
    <AccountSection
      title='Payment Methods'
      emptyMessage=' You don’t have any saved cards yet.'
      isEmpty={cards.length === 0}
      Action={() => (
        <button className='rounded-md border px-4 py-2 text-sm'>
          Add card
        </button>
      )}
    >
      {cards.map((card) => (
        <CardItem key={card.id} {...card} />
      ))}
    </AccountSection>
  )
}
