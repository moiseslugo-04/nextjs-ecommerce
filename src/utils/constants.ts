import { ShoppingBag, Sparkles, Shirt } from 'lucide-react'

export const InitialLoginState = {
  identifier: '',
  password: '',
}
export const InitialLoginErrors = {
  identifier: null,
  password: null,
  login: null,
}

export const InitialRegisterState = {
  fullName: '',
  lastName: '',
  cpf: undefined,
  tell: undefined,
  address: '',
  dataBirthday: '',
}

export const ECOSYSTEM_PRODUCTS_CARTS = [
  {
    title: 'Gechis Market',
    Icon: ShoppingBag,
    color: 'bg-blue-500',
    link: '/market',
    category: 'market',
    description:
      'Your destination for smarter everyday shopping — from groceries to essentials, all in one place.',
  },
  {
    title: 'Gechis Clothes',
    Icon: Shirt,
    color: 'bg-purple-500',
    link: '/clothes',
    category: 'clothes',
    description:
      'Modern fashion designed for real life — minimalist, comfortable, and full of style.',
  },
  {
    title: 'Gechis Beauty',
    Icon: Sparkles,
    color: 'bg-pink-500',
    link: '/beauty',
    category: 'beauty',
    description:
      'A curated selection of beauty and self-care products to help you look and feel your best.',
  },
]
