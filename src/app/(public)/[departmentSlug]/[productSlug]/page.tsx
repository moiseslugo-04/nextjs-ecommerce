import { BreadCrumbs } from '@components//Breadcrumbs'
import { NotFound } from '@components/NotFound'
import { ProductDetails } from '@components/ProductDetail'
import { ProductServices } from '@/lib/services/productService'
import { Suspense } from 'react'
import ProductDetailSkeleton from '@/components/skeletons/ProductDetailSkeleton'
interface ProductPageProps {
  params: Promise<{ productSlug: string }>
}
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productSlug: slug } = await params
  const data = await ProductServices.getProduct(slug)
  if (!data?.product) return <NotFound />
  const { product, breadcrumbs } = data
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <div className='flex flex-col w-full'>
        <section className='grow min-h-full my-4 flex justify-center  flex-col'>
          <BreadCrumbs breadCrumbs={breadcrumbs} />
          <ProductDetails product={product} />
        </section>
      </div>
    </Suspense>
  )
}
