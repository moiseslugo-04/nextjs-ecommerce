'use client'

import { Card } from '@components/ui/card'
import { SerializedProduct } from '../types'
import { Sparkle } from 'lucide-react'
import { Button } from '@components/ui/button'
import { useCartActions } from '@/features/cart/hooks/useCartActions'
import Image from 'next/image'
import Link from 'next/link'
import { AppLink } from '@/components/shared/AppLink'
interface ProductCardProps {
  product: SerializedProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { onAddToCart } = useCartActions()
  const parsedPrice = product.price?.toFixed(2)
  return (
    <Card className='flex flex-col card overflow-hidden group w-full max-w-sm mx-auto border-none'>
      <Link
        className='relative w-full h-60 overflow-hidden'
        href={`/${product.category.department.slug}/${product.slug}`}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          unoptimized
          placeholder='empty'
          className='object-cover group-hover:scale-105 transition-transform duration-300'
          sizes='(max-width: 768px) 100vw, 33vw'
        />
      </Link>
      <div className='p-6 grow flex flex-col justify-center items-center py-5 '>
        <h3 className='text-xl font-semibold mb-2'>{product.name}</h3>
        <p className='text-gray-600 mb-4'>{product.description}</p>
        <div className='w-full  flex flex-col  gap-2 '>
          <div className='flex  w-full  justify-between items-center'>
            <span className='text-2xl font-bold text-gechis-blue'>
              R${parsedPrice}
            </span>
            <span className='text-sm font-semibold text-gechis-blue-dark'>
              Stock: {product.stock}
            </span>
          </div>
          <div className='flex gap-2 justify-between items-center'>
            <Button
              className='btn-primary flex items-center text-sm p-2!'
              onClick={() => onAddToCart(product)}
            >
              <Sparkle size={18} />
              Add to Card
            </Button>
            <AppLink
              variant={'secondary'}
              size={'sm'}
              className='p-2'
              href={`/${product.category.department.slug}/${product.slug}`}
            >
              View Details
            </AppLink>
          </div>
        </div>
      </div>
    </Card>
  )
}
