import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function ProductDetailSkeleton() {
  return (
    <section className='size-full flex flex-col gap-4 items-center justify-center py-6'>
      <Skeleton className='h-12 w-[80%] bg-gray-400 ' />
      <Card className='flex flex-col md:flex-row border-none'>
        <CardHeader className='min-w-[300px] min-h-[400px] size-full'>
          <Skeleton className='bg-gray-400 size-full ' />
        </CardHeader>
        <CardContent className='min-w-[300px] min-h-[300px] size-full flex flex-col gap-4 justify-center'>
          <Skeleton className='bg-gray-400 w-full h-7 rounded-sm' />
          <div className='w-full flex flex-col gap-1'>
            <Skeleton className='bg-gray-400 w-full h-3 rounded-sm' />
            <Skeleton className='bg-gray-400 w-[80%] h-3 rounded-sm' />
            <Skeleton className='bg-gray-400 w-full h-3 rounded-sm mt-4' />
            <Skeleton className='bg-gray-400 w-[80%] h-3 rounded-sm' />
          </div>
          <Skeleton className='w-20 rounded-lg h-6 bg-gray-400' />
          <Skeleton className='w-full rounded-lg h-10 bg-gray-400' />
        </CardContent>
      </Card>
    </section>
  )
}
