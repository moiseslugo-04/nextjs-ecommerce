import Image from 'next/image'

type BrandHeaderProps = {
  logoSrc: string
  brandName: string
  subtitle?: string
}

export function BrandHeader({
  logoSrc,
  brandName,
  subtitle,
}: BrandHeaderProps) {
  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <div className='flex aspect-square size-8 items-center justify-center rounded-lg outline-1 outline-black'>
          <Image
            src={logoSrc}
            alt={`${brandName} logo`}
            width={50}
            height={50}
            quality={75}
          />
        </div>

        <div className='grid text-left text-sm leading-tight'>
          <p className='truncate font-semibold'>{brandName}</p>

          {subtitle && (
            <span className='truncate text-xs text-muted-foreground'>
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
