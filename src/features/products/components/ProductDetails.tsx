'use client'
import { AppLink } from '@components/shared/AppLink'
import { Button } from '@components/ui/button'
import { useCartActions } from '@/features/cart/hooks/useCartActions'
import { SerializedProduct } from '../types'
import Image from 'next/image'

interface ProductDetailProps {
  product: SerializedProduct
}
export function ProductDetails({ product }: ProductDetailProps) {
  const { onAddToCart } = useCartActions()
  return (
    <div className='w-full px-4  py-5'>
      {/* Back Link */}
      <AppLink href={`/${product.category.department.slug}`} variant={'link'}>
        ← Back to {product.category.department.name}
      </AppLink>
      <div className='flex flex-col md:flex-row gap-10 m-4  pt-6 pb-12'>
        {/* Left: Product Image */}
        <div className='w-full md:w-1/2 relative rounded-2xl overflow-hidden bg-gray-100 h-96 flex items-center justify-center'>
          <Image
            src={product.imageUrl}
            alt={product.imageAlt || product.name}
            fill
            className='object-cover'
          />
        </div>

        {/* Right: Product Info */}
        <div className='w-full md:w-1/2 flex flex-col gap-4'>
          <h1 className='text-4xl font-bold'>{product.name}</h1>

          <div className='flex flex-wrap gap-4 text-gray-600 text-sm'>
            <span>
              Department: <strong>{product.category.department.name}</strong>
            </span>
            <span>
              Category: <strong>{product.category.name}</strong>
            </span>
          </div>

          <p className='text-3xl text-gray-900 font-extrabold mt-4'>
            ${product.price.toFixed(2)}
          </p>

          <p className='text-gray-700 mt-2 leading-relaxed'>
            {product.description || 'No description available.'}
          </p>

          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart(product)}
            className='mt-6 bg-blue-600 text-white font-semibold px-8 py-6 rounded-xl hover:bg-blue-700 transition-colors shadow-md'
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
