import { Suspense } from 'react'
import { BreadCrumbs } from '@/components/Breadcrumbs'
import { NotFound } from '@/components/NotFound'
import { ProductList } from '@/components/Products/ProductList'
import { SearchResultsHeader } from '@/components/SearchResultsHeader'
import { PaginationBar } from '@/components/PaginationBar'

import { generateBreadcrumbs } from '@/lib/utils/generatedBreadcrumbs'
import { ProductServices } from '@/lib/services/productService'
import { Filters } from '@/types/product'
import ProductListSkeleton from '@/components/skeletons/ProductListSkeleton'

interface DepartmentPageProps {
  params: Promise<{ departmentSlug: string }>
  searchParams: Promise<Record<string, string>>
}

export default async function SearchPage({
  params,
  searchParams,
}: DepartmentPageProps) {
  const { departmentSlug } = await params
  if (!departmentSlug) return <NotFound message='Invalid department.' />

  const filters = (await searchParams) as Filters
  const query = filters.query?.trim()

  const [breadcrumbs, result] = await Promise.all([
    generateBreadcrumbs(departmentSlug),
    ProductServices.getAllProducts({
      slug: departmentSlug,
      filters,
    }),
  ])

  const { products, totalPages, totalProducts, hasNext, hasPrev, page } = result
  const hasProducts = totalProducts > 0

  return (
    <section className='max-w-7xl py-12  w-full mx-auto space-y-6'>
      {/* Header */}
      <header className='space-y-3'>
        <BreadCrumbs breadCrumbs={breadcrumbs} />
      </header>

      {/* Search summary */}
      {query && (
        <div className='border-b pb-4'>
          <SearchResultsHeader
            searchTerm={query}
            resultsCount={totalProducts}
            entityName='product'
          />
        </div>
      )}

      {/* Products or Not Found */}
      <section className='flex-1'>
        {hasProducts ? (
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList products={products} />
          </Suspense>
        ) : (
          <div className='pt-4 '>
            <NotFound message='No products match your search.' />
          </div>
        )}
      </section>

      {/* Pagination */}
      {hasProducts && (
        <footer className=' flex justify-center'>
          <PaginationBar
            currentPage={page}
            totalPages={totalPages}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </footer>
      )}
    </section>
  )
}
