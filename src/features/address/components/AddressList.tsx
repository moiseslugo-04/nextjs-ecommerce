'use client'

import { useAddressStore } from '@/features/address/hooks/useAddressStore'
import { AddressCard } from './AddressCard'
import { AddressSkeleton } from './AddressSkeleton'

export function AddressList() {
  const { addresses, hydrated } = useAddressStore()
  if (!hydrated) return <AddressSkeleton />
  const isEmpty = addresses.length === 0
  return (
    <>
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
    </>
  )
}
