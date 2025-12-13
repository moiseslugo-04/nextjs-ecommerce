import { ReactNode } from 'react'

interface AccountSectionsProps {
  title: string
  isEmpty: boolean
  emptyMessage: string
  children: ReactNode
  Action?: () => ReactNode
}

export function AccountSection({
  title,
  isEmpty,
  emptyMessage,
  children,
  Action,
}: AccountSectionsProps) {
  return (
    <section className='space-y-6 p-4'>
      <header className='flex items-center justify-between gap-3'>
        {Action && <Action />}
        <h2 className='text-lg font-semibold'>{title}</h2>
      </header>

      {isEmpty && (
        <div className='rounded-md border p-6 text-sm text-gray-500'>
          {emptyMessage}
        </div>
      )}
      <ul className='space-y-4'>{children}</ul>
    </section>
  )
}
