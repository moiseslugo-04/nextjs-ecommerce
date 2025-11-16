import { SerializedProduct } from '@/types/product'
import { Sparkle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: SerializedProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const parsedPrice = product.price?.toFixed(2)
  return (
    <Link
      href={`/${product.category.department.slug}/${product.slug}`}
      className='flex flex-col card overflow-hidden group w-full max-w-sm mx-auto'
    >
      <div className='flex basis-60 relative  overflow-hidden'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          sizes='100dvw'
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300 aspect-w-16 aspect-h-9'
        />
      </div>
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
          <button className='btn-primary flex items-center text-sm p-2!'>
            <Sparkle size={18} className='mr-1' />
            Add to Card
          </button>
        </div>
      </div>
    </Link>
  )
}
