import { AccountSection } from '@/components/features/account/AccountSection'
import { AddressCard } from '@/components/features/account/AddressCard'
export default function AddressPage() {
  const addresses = [
    {
      id: 1,
      addressLine: '123 Main Street, Apt 4B',
      city: 'São Paulo',
      country: 'Brazil',
      postalCode: '01001-000',
      isDefault: true,
    },
    {
      id: 3,
      addressLine: '456 Second Avenue',
      city: 'Rio de Janeiro',
      country: 'Brazil',
      postalCode: '20040-020',
      isDefault: false,
    },
  ]

  return (
    <AccountSection
      Action={() => (
        <button className='rounded-md border px-4 py-2 text-sm'>
          Add address
        </button>
      )}
      title='My Addresses'
      isEmpty={addresses.length < 0}
      emptyMessage='You don’t have any addresses yet.'
    >
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </AccountSection>
  )
}
