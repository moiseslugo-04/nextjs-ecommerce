import Link from 'next/link'
import { ReactNode } from 'react'
interface DepartmentProps {
  name: string
  href: string
  description: string
  icon: ReactNode
}
export function DepartmentCard({
  name,
  href,
  icon,
  description,
}: DepartmentProps) {
  return (
    <Link
      key={name}
      href={href}
      className='group bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-6 transition-all duration-300'
    >
      <div className='flex flex-col items-center text-center'>
        {icon}
        <h3 className='mt-3 text-2xl font-semibold'>{name}</h3>
        <p className='mt-2 text-gray-300 text-sm'>{description}</p>
        <span className='mt-4 inline-block text-gechis-gold group-hover:underline'>
          Shop Now →
        </span>
      </div>
    </Link>
  )
}
