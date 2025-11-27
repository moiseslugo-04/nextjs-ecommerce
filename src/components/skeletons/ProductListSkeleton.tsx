'use client'
import { ProductCardSkeleton } from '@components/skeletons/ProductCardSkeleton'

export default function ProductListSkeleton() {
  return (
    <section className='grow bg-gray-50 text-gray-900'>
      {/* Product Skeleton Grid */}
      <div className='grid w-full  justify-center grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-8 mb-12'>
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}
