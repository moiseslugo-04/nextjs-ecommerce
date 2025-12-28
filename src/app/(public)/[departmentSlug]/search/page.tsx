import { NotFound } from '@components/NotFound'
import { ProductList } from '@/features/products/components/ProductList'
import { SearchResultsHeader } from '@components/SearchResultsHeader'
import { PaginationBar } from '@/components/shared/PaginationBar'
import { getAllProducts } from '@features/products/products.service'
import { Filters } from '@features/products/types'
import { BreadcrumbGenerator } from '@/components/shared/BreadcrumbGenerator'

interface DepartmentPageProps {
  params: Promise<{ departmentSlug: string }>
  searchParams: Promise<Record<string, string>>
}

export default async function SearchPage({
  params,
  searchParams,
}: DepartmentPageProps) {
  const { departmentSlug: slug } = await params
  if (!slug) return <NotFound message='Invalid department.' />

  const filters = (await searchParams) as Filters
  const query = filters.query?.trim()
  const result = await getAllProducts({ slug, filters })

  const { products, totalPages, totalProducts, hasNext, hasPrev, page } = result
  const hasProducts = totalProducts > 0
  return (
    <section className='max-w-7xl py-12  w-full mx-auto space-y-6'>
      {/* Header */}
      <header className='space-y-3'>
        <BreadcrumbGenerator slug={slug} />
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
          <ProductList products={products} />
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
