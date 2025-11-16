import { Category } from '@prisma/client'
import prisma from '@lib/client'
export interface Breadcrumbs {
  name: string
  href: string
}

export async function generateBreadcrumbs(
  slug: string
): Promise<Breadcrumbs[]> {
  const breadcrumbs = [{ name: 'Home', href: '/' }]
  let currentPath = ''
  const [category, department, product] = await Promise.all([
    prisma.category.findUnique({
      where: { slug },
      include: {
        parent: {
          include: {
            parent: true,
          },
        },
        department: true,
      },
    }),
    prisma.department.findUnique({ where: { slug } }),
    prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          include: {
            parent: {
              include: { parent: true },
            },
            department: true,
          },
        },
      },
    }),
  ])

  if (department) {
    currentPath = `/${department.slug}`
    breadcrumbs.push({ name: department.name, href: currentPath })
    return breadcrumbs
  }

  if (category) {
    const dept = category.department
    if (dept) {
      currentPath = `/${dept.slug}`
      breadcrumbs.push({ name: dept.name, href: currentPath })
    }
    const hierarchy = getCategoryAncestors(category as CategoryWithParent)

    for (const c of hierarchy) {
      currentPath += `/categories/${c.slug}`
      breadcrumbs.push({ name: c.name, href: currentPath })
    }

    currentPath += `/categories/${category.slug}`
    breadcrumbs.push({ name: category.name, href: currentPath })
    return breadcrumbs
  }

  if (product) {
    const cat = product.category
    const dept = cat?.department
    if (dept) {
      currentPath = `/${dept.slug}`
      breadcrumbs.push({ name: dept.name, href: currentPath })
    }
    if (cat) {
      currentPath += `/categories/${cat.slug}`
      breadcrumbs.push({ name: cat.name, href: currentPath })
    }
    const hierarchy = getCategoryAncestors(
      product.category as CategoryWithParent
    )
    for (const c of hierarchy) {
      currentPath += `/categories/${c.slug}`
      breadcrumbs.push({ name: c.name, href: currentPath })
    }

    currentPath += `/${product.slug}`
    breadcrumbs.push({ name: product.name, href: currentPath })
    return breadcrumbs
  }

  return breadcrumbs
}
interface CategoryWithParent extends Category {
  parent?: Category
}
function getCategoryAncestors(category: CategoryWithParent) {
  const hierarchy = []
  let parent = category?.parent as CategoryWithParent
  while (parent) {
    hierarchy.unshift(parent)
    parent = parent.parent as CategoryWithParent
  }
  return hierarchy
}
