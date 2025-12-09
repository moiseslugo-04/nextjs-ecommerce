import { NotFound } from '@components/NotFound'
import { ProductDetails } from '@components/features/products/ProductDetails'
import { getProduct } from '@features/products/product.repository'
import { serializedProduct } from '@/lib/utils/dataSerialize'
import { BreadcrumbGenerator } from '@/components/shared/BreadcrumbGenerator'
interface ProductPageProps {
  params: Promise<{ productSlug: string }>
}
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productSlug: slug } = await params
  const product = await getProduct(slug)
  if (!product) return <NotFound />
  const productSerialize = serializedProduct(product)!
  return (
    <div className='flex flex-col w-full'>
      <section className='grow min-h-full my-4 flex justify-center  flex-col'>
        <BreadcrumbGenerator slug={slug} />
        <ProductDetails product={productSerialize} />
      </section>
    </div>
  )
}
