import ProductsSkeleton from '@components/skeletons/ProductListSkeleton'
import { generateBreadcrumbs } from '@lib/utils/generatedBreadcrumbs'
import { Suspense } from 'react'
import { NotFound } from '@components/NotFound'
import { getAllProducts } from '@features/products/products.service'
import { Filters } from '@/lib/features/products/product.types'
import { BreadCrumbs } from '@components/Breadcrumbs'
import { PaginationBar } from '@components/PaginationBar'
import { ProductList } from '@components/Products/ProductList'

interface DepartmentPageProps {
  params: Promise<{ categoriesSlug: string[] }>
  searchParams: Promise<Record<string, string>>
}

export default async function CategoryPages({
  params,
  searchParams,
}: DepartmentPageProps) {
  const { categoriesSlug } = await params
  const slug = categoriesSlug.at(-1)!
  if (!slug) return <NotFound />
  const filters = (await searchParams) as Filters
  const [breadcrumbs, data] = await Promise.all([
    generateBreadcrumbs(slug),
    getAllProducts({ slug, filters }),
  ])
  const { products, totalPages, totalProducts, hasNext, hasPrev, page } = data
  const hasProducts = totalProducts > 0
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <section className='grow flex flex-col pt-6'>
        <div className='flex gap-4 flex-col flex-1'>
          <BreadCrumbs breadCrumbs={breadcrumbs} />
          {hasProducts && <ProductList products={products} />}
        </div>
        <PaginationBar
          currentPage={page}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      </section>
    </Suspense>
  )
}
