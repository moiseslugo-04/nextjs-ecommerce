import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
export function AvatarPreview({ url }: { url: string | null }) {
  return (
    <div className='flex  py-5 sm:flex-1 items-center justify-center'>
      <Avatar className='h-28 w-28 ring-2 ring-muted  '>
        {url ? (
          <AvatarImage className=' object-cover' src={url} />
        ) : (
          <AvatarFallback className='text-2xl'>U</AvatarFallback>
        )}
      </Avatar>
    </div>
  )
}
