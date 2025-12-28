import { SerializedProduct } from '@features/products/types'
export type CartItemType = SerializedProduct & {
  quantity: number
  isGuest: boolean
}

export type ActionPayload = { id: number; name: string }
