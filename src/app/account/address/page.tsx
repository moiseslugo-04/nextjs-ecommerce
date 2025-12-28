import { AddressesHydrator } from '@/features/address/components/AddressesHydrator'
import { AddressList } from '@/features/address/components/AddressList'
import { CreateAddressModal } from '@/features/address/components/CreateAddressModal'
import { getAllUserAddresses } from '@/features/address/address.service'
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
