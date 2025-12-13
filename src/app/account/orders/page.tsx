import { AccountSection } from '@/components/features/account/AccountSection'
import { OrderItem } from '@/components/features/account/OrderItem'
import type { OrderItemType } from '@/lib/features/account/types/types'
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
  return (
    <AccountSection
      title={'My Orders'}
      isEmpty={orders.length < 0}
      emptyMessage=' You don’t have any orders yet.'
    >
      {orders.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </AccountSection>
  )
}
