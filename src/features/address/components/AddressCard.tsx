'use client'

import { Button } from '@/components/ui/button'
import { useAddressMutations } from '../hooks/useAddressMutation'
import { EditAddressModal } from '../components/EditAddressModal'
import { Badge } from '@components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { AddressDTO } from '../types'
import { toast } from 'sonner'

export function AddressCard({ data }: { data: AddressDTO }) {
  const { id, isDefault, address, postalCode, city, country, label } = data
  const { removeAddress, setAsDefault } = useAddressMutations()
  const handleSetAsDefault = () => {
    toast.promise(setAsDefault.mutateAsync(data.id), {
      loading: 'Setting as default address...',
      success: 'Address set as default successfully',
      error: 'Failed to set address as default',
    })
  }
  const handleRemove = () => {
    toast.promise(removeAddress.mutateAsync(data.id), {
      loading: 'Removing address...',
      success: 'Address remove successfully',
      error: 'Failed to remove address',
    })
  }
  return (
    <li
      key={id}
      className={`rounded-lg border p-4 ${
        isDefault ? 'border-green-500' : 'border-gray-200'
      }`}
    >
      <div className='flex flex-col  items-start justify-between gap-4'>
        <Badge className='w-fit text-gray-600 shadow-black/70'>{label}</Badge>

        <div>
          {isDefault && (
            <span className='mb-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700'>
              Default
            </span>
          )}

          <p className='font-medium'>{address}</p>

          <p className='text-sm text-gray-600'>
            {city}, {country}
            {postalCode && ` • ${postalCode}`}
          </p>
        </div>

        <div className='flex gap-2'>
          <EditAddressModal
            label={data.label!}
            id={data.id}
            city={data.city!}
            country={data.country!}
            address={data.address!}
            postalCode={data.postalCode!}
          />

          <Button
            onClick={handleRemove}
            className='text-sm text-red-600 hover:underline'
          >
            Delete
          </Button>
        </div>
      </div>

      {!isDefault && (
        <div className='mt-3'>
          <Button
            onClick={handleSetAsDefault}
            className='text-sm text-gray-700 hover:underline'
          >
            {setAsDefault.isPending ? (
              <p className='flex text-sm gap-2 items-center'>
                Setting as default <Spinner />
              </p>
            ) : (
              'Set as default'
            )}
          </Button>
        </div>
      )}
    </li>
  )
}
