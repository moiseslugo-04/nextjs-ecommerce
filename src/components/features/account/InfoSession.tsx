export function InfoSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className='space-y-5'>
      <h3 className='text-xl font-semibold text-neutral-900 tracking-tight'>
        {title}
      </h3>
      {children}
    </div>
  )
}
