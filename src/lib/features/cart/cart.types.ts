import { SerializedProduct } from '@features/products/product.types'
export type CartItemType = SerializedProduct & {
  quantity: number
  isGuest: boolean
}
