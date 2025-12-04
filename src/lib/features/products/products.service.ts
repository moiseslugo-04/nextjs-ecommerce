import { Filters, SerializedProduct } from '@/types/product'
import {
  getProductList,
  getTotalPages,
} from '@features/products/product.repository'
import { Prisma } from '@prisma/client'
import { serializedProductList } from '@lib/utils/dataSerialize'
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

export async function getAllProducts({
  slug,
  filters,
}: GetAllProducts): Promise<ProductListType> {
  const page = Number(filters.page) || 1
  const limit = Number(filters.limit) || 4
  const skip = (page - 1) * limit

  // Base conditions
  const baseConditions: Prisma.ProductWhereInput = slug
    ? {
        OR: [{ category: { slug } }, { category: { department: { slug } } }],
      }
    : {}
  //Filter Conditions
  const filterConditions = buildFilterConditions(filters)
  //Combine Conditions
  const productsWhere: Prisma.ProductWhereInput = filterConditions
    ? { AND: [baseConditions, filterConditions] }
    : baseConditions

  const props = { slug, filters: productsWhere, skip, take: limit }

  const [rawProducts, totalCount] = await Promise.all([
    getProductList(props),
    getTotalPages(productsWhere),
  ])
  const totalPages = Math.ceil(totalCount / limit)
  return {
    products: serializedProductList(rawProducts),
    totalPages,
    page,
    limit,
    totalProducts: totalCount,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

//Helper to create sort Filters
export function buildOrderBy(
  filters: Filters
): Prisma.ProductOrderByWithRelationInput {
  const orderMap: Record<string, Prisma.ProductOrderByWithRelationInput> = {
    name_asc: { name: 'asc' },
    name_desc: { name: 'desc' },
    price_asc: { name: 'asc' },
    price_desc: { name: 'desc' },
  }

  return filters?.sort ? orderMap[filters.sort] : { createdAt: 'desc' }
}
//Helper to create filter with query ,category
function buildFilterConditions(
  filters: Filters
): Prisma.ProductWhereInput | undefined {
  const conditions: Prisma.ProductWhereInput[] = []
  const query = filters.query?.trim()
  //Filter by query
  if (query) {
    conditions.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { category: { name: { contains: query, mode: 'insensitive' } } },
        {
          category: {
            department: { name: { contains: query, mode: 'insensitive' } },
          },
        },
        { description: { contains: query, mode: 'insensitive' } }, //this si danger very slow, many records
      ],
    })
  }
  //Filter by category
  const category = filters.category?.trim()
  if (category) {
    conditions.push({ category: { slug: category } }) // just match with with categories slug
  }
  //others Filter if is necessary

  return conditions.length > 0 ? { AND: conditions } : undefined
}
