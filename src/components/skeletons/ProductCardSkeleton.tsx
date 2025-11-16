import { Card, CardHeader, CardFooter } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
export function ProductCardSkeleton() {
  return (
    <Card className='border-none overflow-hidden min-h-[300px] min-w-[250px]'>
      <CardHeader className=' w-full h-[60%] p-0 '>
        <Skeleton className='w-full h-full bg-gray-400' />
      </CardHeader>
      <CardFooter className=' w-full h-[40%] flex flex-col gap-2 justify-center px-2 py-4'>
        <Skeleton className='h-4 w-full bg-gray-400' />
        <div className='w-full flex gap-2 flex-col '>
          <Skeleton className='h-2 w-full bg-gray-400' />
          <Skeleton className='h-2 w-[80%] bg-gray-400' />
        </div>
        <div className='w-full  flex items-center justify-between'>
          <Skeleton className='h-5 w-20 bg-gray-400' />
          <Skeleton className='h-4 w-16 bg-gray-400' />
        </div>

        <Skeleton className='h-10 w-full bg-gray-400' />
      </CardFooter>
    </Card>
  )
}
