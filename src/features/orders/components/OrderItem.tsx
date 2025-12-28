import type { OrderItemType } from '@/features/account/types/types'
export function OrderItem({
  id,
  status,
  orderNumber,
  createdAt,
  currency,
  total,
}: OrderItemType) {
  return (
    <li key={id} className='rounded-lg border p-4'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='font-medium'>Order #{orderNumber}</p>

          <p className='text-sm text-gray-600'>Placed on {createdAt}</p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            status === 'paid' && 'bg-blue-100 text-blue-700'
          } ${status === 'shipped' && 'bg-yellow-100 text-yellow-700'} ${
            status === 'delivered' && 'bg-green-100 text-green-700'
          } ${
            status === 'cancelled' && 'bg-red-100 text-red-700'
          } ${status === 'pending' && 'bg-gray-100 text-gray-700'}`}
        >
          {status}
        </span>
      </div>

      <div className='mt-3 flex items-center justify-between'>
        <p className='font-semibold'>
          {currency} {total.toFixed(2)}
        </p>

        <div className='flex gap-3'>
          <button className='text-sm text-blue-600 hover:underline'>
            View details
          </button>

          <button className='text-sm text-gray-700 hover:underline'>
            Track order
          </button>
        </div>
      </div>
    </li>
  )
}
