import { ReactNode, FormEventHandler } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@components/ui/card'
import { cn } from '@lib/ui/utils'

interface FormCardProps {
  title: string
  description?: string
  children: ReactNode
  onSubmit?: FormEventHandler<HTMLFormElement>
  footer?: ReactNode
  className?: string
}

export function FormCard({
  title,
  description,
  children,
  onSubmit,
  footer,
  className,
}: FormCardProps) {
  return (
    <Card
      className={cn(
        'flex flex-col gap-4 w-full max-w-2lg m-auto rounded-2xl shadow-lg border border-neutral-200/70 bg-white',
        'transition-all duration-300 hover:shadow-xl hover:border-neutral-300',
        className
      )}
    >
      <CardHeader className='text-center space-y-1 pb-2'>
        <h1 className='text-2xl font-semibold tracking-tight text-neutral-900'>
          {title}
        </h1>

        {description && (
          <p className='text-sm text-neutral-500'>{description}</p>
        )}
      </CardHeader>

      <form onSubmit={onSubmit} className='space-y-4'>
        <CardContent className='space-y-4'>{children}</CardContent>

        {footer && (
          <CardFooter className='flex flex-col gap-4  '>{footer}</CardFooter>
        )}
      </form>
    </Card>
  )
}
