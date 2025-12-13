'use client'

import { Button } from '@/components/ui/button'
interface AddressCardProps {
  address: {
    id: number
    isDefault: boolean
    addressLine: string
    city: string
    country: string
    postalCode?: string
  }
}
export function AddressCard({ address }: AddressCardProps) {
  const { id, isDefault, addressLine, postalCode, city, country } = address
  return (
    <li
      key={id}
      className={`rounded-lg border p-4 ${
        isDefault ? 'border-green-500' : 'border-gray-200'
      }`}
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          {isDefault && (
            <span className='mb-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700'>
              Default
            </span>
          )}

          <p className='font-medium'>{addressLine}</p>

          <p className='text-sm text-gray-600'>
            {city}, {country}
            {postalCode && ` • ${postalCode}`}
          </p>
        </div>

        <div className='flex gap-2'>
          <Button
            onClick={() => console.log(`update address ${id}`)}
            className='text-sm text-blue-600 hover:underline'
          >
            Edit
          </Button>

          <Button
            onClick={() => console.log(`delete address ${id}`)}
            className='text-sm text-red-600 hover:underline'
          >
            Delete
          </Button>
        </div>
      </div>

      {!isDefault && (
        <div className='mt-3'>
          <Button
            onClick={() => console.log(`set address ${id} as default`)}
            className='text-sm text-gray-700 hover:underline'
          >
            Set as default
          </Button>
        </div>
      )}
    </li>
  )
}
