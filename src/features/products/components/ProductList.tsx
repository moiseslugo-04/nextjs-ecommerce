import { ProductCard } from './ProductCard'
import type { SerializedProduct } from '../types'
interface ProductListProps {
  products: SerializedProduct[]
  categories?: { name: string; slug: string }[]
  breadcrumbs?: { name: string; href: string }[]
}

export async function ProductList({ products }: ProductListProps) {
  return (
    <section className='grow py-8 text-gray-900 '>
      <div className='container-custom  px-4 '>
        {products.length > 0 ? (
          <div className='grid w-full justify-center grid-cols-[1fr] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 sm:px-0 px-8'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <p className='text-xl font-medium text-gray-500 mb-2'>
              No products found
            </p>
            <p className='text-sm text-gray-400'>
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
