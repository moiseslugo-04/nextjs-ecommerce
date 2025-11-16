import { ProductWithRelations, SerializedProduct } from '@/types/product'

export function serializedProduct(
  product: ProductWithRelations | null
): SerializedProduct | null {
  if (!product) return null
  const { price, ...rest } = product
  return { ...rest, price: Number(price) }
}

export function serializedProductList(
  products: ProductWithRelations[]
): SerializedProduct[] | [] {
  if (!products) return []
  return products
    .map(serializedProduct)
    .filter((product): product is SerializedProduct => product !== null)
}
