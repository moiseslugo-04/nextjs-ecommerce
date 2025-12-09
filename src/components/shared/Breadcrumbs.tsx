import Link from 'next/link'
interface BreadCrumbsProps {
  breadCrumbs: { name: string; href: string }[]
}
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb'
export function BreadCrumbs({ breadCrumbs }: BreadCrumbsProps) {
  return (
    <Breadcrumb className='px-4'>
      <BreadcrumbList>
        {breadCrumbs?.map(({ name, href }, index) => {
          const isLast = index == breadCrumbs.length - 1
          return (
            <BreadcrumbItem key={name}>
              {isLast ? (
                <BreadcrumbPage>{name}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      className='text-blue-500 hover:text-blue-600 hover:underline transition-colors'
                    >
                      {name}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
