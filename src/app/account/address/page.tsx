import { AddressCard } from '@/components/features/account/AddressCard'
import { CreateAddressModal } from '@/components/features/account/CreateAddressModal'
import { getAllUserAddresses } from '@/lib/features/address/address.service'
export default async function AddressPage() {
  const addresses = await getAllUserAddresses()
  const isEmpty = addresses.length === 0
  return (
    <section className='space-y-6 p-4'>
      <header className='flex items-center justify-between gap-3'>
        <h2 className='text-lg font-semibold'>My Addresses</h2>
        <CreateAddressModal />
      </header>

      {isEmpty && (
        <div className='rounded-md border p-6 text-sm text-gray-500'>
          You don’t have any addresses yet.
        </div>
      )}
      <ul className='space-y-4'>
        {addresses.map((address) => (
          <AddressCard key={address.id} data={{ ...address }} />
        ))}
      </ul>
    </section>
  )
}
