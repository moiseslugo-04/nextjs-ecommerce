import { BreadCrumbs } from '@components//Breadcrumbs'
import { NotFound } from '@components/NotFound'
import { ProductDetails } from '@components/ProductDetail'
import { getProduct } from '@features/products/product.repository'
import { Suspense } from 'react'
import ProductDetailSkeleton from '@components/skeletons/ProductDetailSkeleton'
import { generateBreadcrumbs } from '@/lib/utils/generatedBreadcrumbs'
import { serializedProduct } from '@/lib/utils/dataSerialize'
interface ProductPageProps {
  params: Promise<{ productSlug: string }>
}
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productSlug: slug } = await params

  const [product, breadcrumbs] = await Promise.all([
    getProduct(slug),
    generateBreadcrumbs(slug),
  ])
  if (!product) return <NotFound />
  const productSerialize = serializedProduct(product)!
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <div className='flex flex-col w-full'>
        <section className='grow min-h-full my-4 flex justify-center  flex-col'>
          <BreadCrumbs breadCrumbs={breadcrumbs} />
          <ProductDetails product={productSerialize} />
        </section>
      </div>
    </Suspense>
  )
}
