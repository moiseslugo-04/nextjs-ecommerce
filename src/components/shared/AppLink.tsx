import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@lib/ui/utils'

const linkVariants = cva(
  'inline-flex items-center justify-center rounded-md font-bold transition hover:scale-[1.02]',
  {
    variants: {
      variant: {
        primary: 'bg-gechis-gold text-gechis-blue py-3 w-full',
        secondary: 'bg-blue-500 text-white text-sm p-2',
        link: 'text-blue-600 hover:text-blue-800 hover:scale-none',
        ghost: 'bg-transparent text-gechis-gold hover:bg-gechis-gold/10',
      },
      size: {
        sm: 'text-sm px-3',
        md: 'text-base px-4',
        lg: 'text-lg px-6',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

type AppLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
} & VariantProps<typeof linkVariants>

export function AppLink({
  href,
  children,
  variant,
  size,
  className,
}: AppLinkProps) {
  return (
    <Link
      href={href}
      className={cn(linkVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  )
}
