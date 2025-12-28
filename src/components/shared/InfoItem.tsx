export function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className='space-y-1'>
      <p className='text-lg font-medium text-neutral-900 '>{label}</p>
      <p className='text-md font-semibold text-gray-600'>{value}</p>
    </div>
  )
}
