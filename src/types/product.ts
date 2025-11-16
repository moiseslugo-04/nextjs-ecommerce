import { Prisma } from '@/lib/prisma/generated/client'
export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: { category: { include: { department: true } } }
}>

export type SerializedProduct = Omit<ProductWithRelations, 'price'> & {
  price: number
}
export enum ProductTypes {
  CATEGORY = 'category',
  DEPARTMENT = 'department',
  PRODUCT = 'product',
  ERROR = 'error',
}
export type Category = { name: string; slug: string }
export interface ProductsWitCategories {
  products: SerializedProduct[]
  categories: Category[]
}
export type ProductData =
  | {
      type: ProductTypes.DEPARTMENT
      data: Awaited<ProductsWitCategories>
    }
  | {
      type: ProductTypes.CATEGORY
      data: Awaited<ProductsWitCategories>
    }
  | {
      type: ProductTypes.PRODUCT
      data: Awaited<SerializedProduct>
    }
  | {
      type: ProductTypes.ERROR
      data: null
    }

export type FindEntityResults =
  | {
      type: ProductTypes.DEPARTMENT
      data: Category
    }
  | { type: ProductTypes.PRODUCT; data: Category }
  | {
      type: ProductTypes.CATEGORY
      data: Category
    }
  | {
      type: ProductTypes.ERROR
      data: null
    }

export type Filters = {
  query?: string
  sort?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'
  category?: string
  page?: number
  limit?: number
}
