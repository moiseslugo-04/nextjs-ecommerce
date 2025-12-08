'use client'

import { Card } from '@components/ui/card'
import { SerializedProduct } from '@/lib/features/products/product.types'
import { Sparkle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { useCartStore } from '@/lib/features/cart/client/useCartStore'
import { useSession } from '@/lib/features/auth/client/hooks/useSession'
import { useMutation } from '@tanstack/react-query'
import { addToCartAction } from '@/lib/features/cart/server/cart.actions'
import { toast } from 'sonner'

interface ProductCardProps {
  product: SerializedProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, removeItem } = useCartStore()
  const { data: session } = useSession()
  const { mutateAsync } = useMutation({
    mutationFn: addToCartAction,
    mutationKey: ['add_to_cart'],
  })
  const isGuest = !session?.payload
  const parsedPrice = product.price?.toFixed(2)

  const handleAddToCart = async () => {
    // Optimistic ui
    addItem(product, isGuest) // update immediately the UI
    if (session) {
      const response = await mutateAsync(product.id)
      if (!response.success) {
        toast.error(`Error trying add ${product.name} in cart, Trying again`)
        //Rollback
        removeItem(product.id)
        return
      }
    }
    toast.success(`${product.name} was added with success`)
    //
  }
  return (
    <Card className='flex flex-col card overflow-hidden group w-full max-w-sm mx-auto border-none'>
      <div className='flex basis-60 relative  overflow-hidden'>
        <Link href={`/${product.category.department.slug}/${product.slug}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            sizes='100dvw'
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300 aspect-w-16 aspect-h-9'
          />
        </Link>
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
          <div className='flex gap-2 justify-between items-center'>
            <Button
              className='btn-primary flex items-center text-sm p-2!'
              onClick={handleAddToCart}
            >
              <Sparkle size={18} />
              Add to Card
            </Button>
            <Link
              className='btn bg-blue-500 text-white text-sm p-2!'
              href={`/${product.category.department.slug}/${product.slug}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
