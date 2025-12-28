import { OrderItem } from '@/features/orders/components/OrderItem'
import type { OrderItemType } from '@/features/account/types/types'
const orders = [
  {
    id: 'ord_1',
    orderNumber: '100023',
    status: 'delivered',
    total: 249.99,
    currency: 'USD',
    createdAt: '2024-11-28',
  },
  {
    id: 'ord_2',
    orderNumber: '100024',
    status: 'shipped',
    total: 89.5,
    currency: 'USD',
    createdAt: '2024-12-02',
  },
  {
    id: 'ord_3',
    orderNumber: '100025',
    status: 'paid',
    total: 129.0,
    currency: 'USD',
    createdAt: '2024-12-05',
  },
  {
    id: 'ord_4',
    orderNumber: '100026',
    status: 'cancelled',
    total: 59.99,
    currency: 'USD',
    createdAt: '2024-12-08',
  },
] as OrderItemType[]
export default function OrderList() {
  // ! HERE CALL THE SERVICE  TO GET ALL ORDERS

  const isEmpty = orders.length === 0
  return (
    <section className='space-y-6 p-4'>
      <header className='flex items-center justify-between gap-3'>
        <h2 className='text-lg font-semibold'>My Orders</h2>
        <button className='rounded-md border px-4 py-2 text-sm'>
          Add card
        </button>
      </header>

      {isEmpty && (
        <div className='rounded-md border p-6 text-sm text-gray-500'>
          You don’t have any orders yet.
        </div>
      )}
      <ul className='space-y-4'>
        {orders.map((order) => (
          <OrderItem key={order.id} {...order} />
        ))}
      </ul>
    </section>
  )
}
