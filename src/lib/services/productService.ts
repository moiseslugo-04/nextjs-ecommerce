import { Filters, SerializedProduct } from '@/types/product'
import prisma from '../client'
import { ProductRepository } from '@lib/repositories/ProductRepository'
const repository = new ProductRepository(prisma)

interface GetAllProducts {
  slug: string
  filters: Filters
}
export interface ProductListType {
  products: SerializedProduct[]
  totalPages: number
  page: number
  limit: number
  totalProducts: number
  hasNext: boolean
  hasPrev: boolean
}
export class ProductServices {
  static async getAllProducts({
    slug,
    filters,
  }: GetAllProducts): Promise<ProductListType> {
    const page = Number(filters.page) || 1
    const limit = Number(filters.limit) || 4
    const skip = (page - 1) * limit
    const props = { slug, filters, skip, take: limit } // I feel more readable
    const { products, totalCount } = await repository.getProductList(props)
    const totalPages = Math.ceil(totalCount / limit)
    return {
      products,
      totalPages,
      page,
      limit,
      totalProducts: totalCount,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }
  }

  static async getProduct(slug: string) {
    return repository.getProduct(slug)
  }
}
