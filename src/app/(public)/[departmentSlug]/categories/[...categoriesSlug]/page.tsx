import { NotFound } from '@components/NotFound'
import { getAllProducts } from '@features/products/products.service'
import { Filters } from '@/lib/features/products/product.types'
import { PaginationBar } from '@/components/shared/PaginationBar'
import { ProductList } from '@/components/features/products/ProductList'
import { BreadcrumbGenerator } from '@/components/shared/BreadcrumbGenerator'

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
  const data = await getAllProducts({ slug, filters })
  const { products, totalPages, totalProducts, hasNext, hasPrev, page } = data
  const hasProducts = totalProducts > 0
  return (
    <section className='grow flex flex-col pt-6'>
      <div className='flex gap-4 flex-col flex-1'>
        <BreadcrumbGenerator slug={slug} />
        {hasProducts && <ProductList products={products} />}
      </div>
      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </section>
  )
}
