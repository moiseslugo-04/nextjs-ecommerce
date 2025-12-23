import { AddressesHydrator } from '@/components/features/account/AddressesHydrator'
import { AddressList } from '@/components/features/account/AddressList'
import { CreateAddressModal } from '@/components/features/account/CreateAddressModal'
import { getAllUserAddresses } from '@/lib/features/address/address.service'
export default async function AddressPage() {
  const addresses = await getAllUserAddresses()
  return (
    <section className='space-y-6 p-4'>
      <header className='flex items-center justify-between gap-3'>
        <h2 className='text-lg font-semibold'>My Addresses</h2>
        <CreateAddressModal />
      </header>
      <AddressesHydrator initialAddress={addresses} />
      <AddressList />
    </section>
  )
}
