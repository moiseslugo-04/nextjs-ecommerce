import { generateBreadcrumbs } from '@lib/utils/generatedBreadcrumbs'
import { NotFound } from '@components/NotFound'
import { getAllProducts } from '@features/products/products.service'
import type { Filters } from '@/lib/features/products/product.types'
import { Sparkles } from 'lucide-react'
import { capitalizeWord } from '@lib/utils/ui/utils'
import { BreadCrumbs } from '@components/Breadcrumbs'
import { SearchResultsHeader } from '@components/SearchResultsHeader'
import { PaginationBar } from '@components/PaginationBar'
import { ProductList } from '@components/Products/ProductList'
import { Suspense } from 'react'
import ProductsSkeleton from '@components/skeletons/ProductListSkeleton'
interface DepartmentPageProps {
  params: Promise<{ departmentSlug: string }>
  searchParams: Promise<Record<string, string>>
}
const departments = ['market', 'clothes', 'beauty']
export default async function DepartmentPage({
  params,
  searchParams,
}: DepartmentPageProps) {
  const { departmentSlug: slug } = await params
  if (!slug || !departments.includes(slug)) return <NotFound />
  const filters = (await searchParams) as Filters
  const [breadcrumbs, data] = await Promise.all([
    generateBreadcrumbs(slug),
    getAllProducts({ slug, filters }),
  ])

  const query = filters.query?.trim()
  const { products, totalPages, totalProducts, hasNext, hasPrev, page } = data
  const hasProducts = totalProducts > 0
  return (
    <section className='grow flex-col max-w-5xl'>
      <header className='relative bg-gechis-blue text-white py-10 mb-8 rounded-b-3xl shadow-lg overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-b from-gechis-blue/80 to-gechis-blue/40 pointer-events-none' />
        <div className='container-custom relative z-10 text-center max-w-3xl mx-auto px-6'>
          <h1 className='text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3 tracking-tight'>
            <Sparkles className='w-9 h-9 text-yellow-300 animate-pulse' />
            {capitalizeWord(slug)}
          </h1>
          <p className='text-lg md:text-xl opacity-90 font-light'>
            Discover the best <span className='font-semibold'>{slug}</span>{' '}
            products chosen for you
          </p>
        </div>
      </header>
      <Suspense fallback={<ProductsSkeleton />}>
        <div className='flex gap-3 flex-col flex-1'>
          <BreadCrumbs breadCrumbs={breadcrumbs} />
          {query && (
            <SearchResultsHeader
              searchTerm={query}
              resultsCount={0}
              entityName='product'
            />
          )}
          {hasProducts && <ProductList products={products} />}
        </div>
        <PaginationBar
          currentPage={page}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      </Suspense>
    </section>
  )
}
