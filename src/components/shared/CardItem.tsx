import type { CreditCardType } from '@/features/account/types/types'

export function CardItem({
  id,
  isDefault,
  brand,
  last4,
  expMonth,
  expYear,
  holderName,
}: CreditCardType) {
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

          <p className='font-medium capitalize'>
            {brand} •••• {last4}
          </p>

          <p className='text-sm text-gray-600'>
            {holderName} · Expires {expMonth}/{expYear}
          </p>
        </div>

        <div className='flex gap-2'>
          <button className='text-sm text-blue-600 hover:underline'>
            Edit
          </button>

          <button className='text-sm text-red-600 hover:underline'>
            Remove
          </button>
        </div>
      </div>

      {!isDefault && (
        <div className='mt-3'>
          <button className='text-sm text-gray-700 hover:underline'>
            Set as default
          </button>
        </div>
      )}
    </li>
  )
}
