import { Skeleton } from '@components/ui/skeleton'

export function AddressSkeleton() {
  return (
    <>
      {Array(3)
        .fill(null)
        .map((_, i) => {
          return (
            <Skeleton
              key={i}
              className='w-full h-full rounded-lg bg-gray-200 p-3'
            >
              <Skeleton className='mt-2 w-[10%] h-4 bg-gray-300 rounded-sm ' />
              <Skeleton className='mt-2 w-[80%] h-3 bg-gray-300 rounded-sm ' />
              <Skeleton className='mt-2 w-[80%] h-3 bg-gray-300 rounded-sm ' />
              <Skeleton className='mt-2 w-[80%] h-3 bg-gray-300 rounded-sm ' />
              <div className='flex justify-start items-center gap-3'>
                <Skeleton className='mt-2 w-[10%] h-4 bg-gray-300 rounded-sm ' />
                <Skeleton className='mt-2 w-[10%] h-4 bg-gray-300 rounded-sm ' />
              </div>
            </Skeleton>
          )
        })}
    </>
  )
}
