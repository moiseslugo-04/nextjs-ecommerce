import {
  User2Icon,
  HousePlus,
  CreditCard,
  Package,
  UserLock,
} from 'lucide-react'
export const data = {
  navMain: [
    {
      title: 'Account',
      path: '/account',
      Icon: User2Icon,
    },
    {
      title: 'Address',
      path: '/account/address',
      Icon: HousePlus,
    },
    {
      title: 'Cards',
      path: '/account/cards',
      Icon: CreditCard,
    },
    {
      title: 'Orders',
      path: '/account/orders',
      Icon: Package,
    },
    {
      title: 'Authentication',
      path: '/account/auth',
      Icon: UserLock,
    },
  ],
}
