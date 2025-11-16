import { Filters, SerializedProduct } from '@/types/product'
import { PrismaClient, Prisma } from '@prisma/client'

// ProductOrderByWithRelationInput,
//  ProductWhereInput
import {
  serializedProduct,
  serializedProductList,
} from '../utils/dataSerialize'
import { Breadcrumbs, generateBreadcrumbs } from '../utils/generatedBreadcrumbs'
interface ProductListRes {
  products: SerializedProduct[]
  totalCount: number
}

interface GetProductsLists {
  slug: string
  filters: Filters
  skip: number
  take: number
}
export class ProductRepository {
  private readonly db: PrismaClient
  constructor(prisma: PrismaClient) {
    this.db = prisma
  }
  // Methods
  async getProduct(slug: string): Promise<{
    product: SerializedProduct | null
    breadcrumbs: Breadcrumbs[]
  } | null> {
    const [breadcrumbs, product] = await Promise.all([
      await generateBreadcrumbs(slug),
      await this.db.product.findUnique({
        where: { slug },
        include: { category: { include: { department: true } } },
      }),
    ])
    return {
      product: serializedProduct(product),
      breadcrumbs,
    }
  }
  async getProductList({
    slug,
    filters,
    skip,
    take,
  }: GetProductsLists): Promise<ProductListRes> {
    // Base conditions
    const baseConditions: Prisma.ProductWhereInput = {
      OR: [{ category: { slug } }, { category: { department: { slug } } }],
    }
    //Filter Conditions
    const filterConditions = this.buildFilterConditions(filters)

    //Combine Conditions
    const productsWhere: Prisma.ProductWhereInput = filterConditions
      ? { AND: [baseConditions, filterConditions] }
      : baseConditions

    // Promises
    const [rawProducts, totalCount] = await Promise.all([
      await this.db.product.findMany({
        where: productsWhere,
        skip,
        take,
        include: {
          category: { include: { department: true } },
        },
      }),
      this.getTotalPages(productsWhere),
    ])

    //Serialize products
    return {
      products: serializedProductList(rawProducts),
      totalCount,
    }
  }
  private async getTotalPages(where: Prisma.ProductWhereInput) {
    return this.db.product.count({ where })
  }
  // Filters
  private buildFilterConditions(
    filters: Filters
  ): Prisma.ProductWhereInput | undefined {
    const conditions: Prisma.ProductWhereInput[] = []
    //Filter by query
    if (filters.query) {
      conditions.push({
        name: { contains: filters.query, mode: 'insensitive' },
      })
    }
    //Filter by category
    if (filters.category) {
      conditions.push({
        category: {
          name: { contains: filters.category, mode: 'insensitive' },
        },
      })
    }
    //others Filter...

    return conditions.length > 0 ? { AND: conditions } : undefined
  }
  //Sort
  buildOrderBy(filters: Filters): Prisma.ProductOrderByWithRelationInput {
    const orderMap: Record<string, Prisma.ProductOrderByWithRelationInput> = {
      name_asc: { name: 'asc' },
      name_desc: { name: 'desc' },
      price_asc: { name: 'asc' },
      price_desc: { name: 'desc' },
    }

    return filters?.sort ? orderMap[filters.sort] : { createdAt: 'desc' }
  }
}
