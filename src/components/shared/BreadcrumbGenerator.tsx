// app/components/BreadcrumbGenerator.tsx (SERVER)
import { generateBreadcrumbs } from '@/lib/utils/generatedBreadcrumbs'
import { BreadCrumbs } from './Breadcrumbs'
import { Suspense } from 'react'

type Props = { slug: string }
export async function BreadcrumbGenerator({ slug }: Props) {
  const breadcrumbs = await generateBreadcrumbs(slug)
  return (
    <Suspense>
      <BreadCrumbs breadCrumbs={breadcrumbs} />
    </Suspense>
  )
}
