import { Prisma } from '@prisma/client'
import prisma from '@lib/client'

interface GetProductsLists {
  filters: Prisma.ProductWhereInput
  skip: number
  take: number
}

export async function getProduct(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: { category: { include: { department: true } } },
  })
}

export async function getProductList({
  skip,
  take,
  filters,
}: GetProductsLists) {
  return await prisma.product.findMany({
    where: filters,
    skip,
    take,
    include: {
      category: { include: { department: true } },
    },
  })
}

export async function getTotalPages(where: Prisma.ProductWhereInput) {
  return prisma.product.count({ where })
}

export function getAllDepartments() {
  return prisma.department.findMany()
}
