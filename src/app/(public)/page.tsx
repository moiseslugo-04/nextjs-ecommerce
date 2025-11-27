import { ShoppingBag, Shirt, Sparkles } from 'lucide-react'
import { DepartmentCard } from '@components/DepartmentCard'
export default async function Home() {
  const departments = [
    {
      name: 'Market',
      description: 'Fresh products and essentials for your daily life.',
      icon: <ShoppingBag className='h-8 w-8 text-gechis-gold' />,
      href: '/market',
    },
    {
      name: 'Clothes',
      description: 'Trendy styles that fit your unique personality.',
      icon: <Shirt className='h-8 w-8 text-gechis-gold' />,
      href: '/clothes',
    },
    {
      name: 'Beauty',
      description: 'Top beauty products to make you feel your best.',
      icon: <Sparkles className='h-8 w-8 text-gechis-gold' />,
      href: '/beauty',
    },
  ]

  return (
    <section className='grow'>
      <div className='relative bg-gechis-blue text-white overflow-hidden'>
        {/* Background with overlay */}
        <div
          className='absolute inset-0 bg-cover bg-center z-0'
          style={{
            backgroundImage: 'url(/assets/images/banner.png)',
            opacity: 0.25,
          }}
        ></div>

        <div className='relative z-10 px-6 py-15 text-center max-w-4xl mx-auto'>
          <h1 className='font-display text-3xl md:text-5xl font-bold mb-4'>
            A New Era of Smart Shopping {''}
            <span className='text-gechis-gold'>GECHIS</span>
          </h1>
          <div className='pb-10'>
            <div className='container-custom'>
              <div className='text-center max-w-3xl mx-auto mb-10'>
                <p className='text-lg md:text-xl '>
                  Gechis is redefining how people connect with products —
                  merging design, technology, and purpose into one seamless
                  e-commerce experience.
                </p>
                <p className='mt-4  leading-relaxed'>
                  From daily essentials to fashion and beauty, Gechis is a
                  revolutionary digital marketplace built for transparency,
                  innovation, and user trust. Our mission is simple: make online
                  shopping smarter, faster, and more human.
                </p>
                <p className='text-lg  mt-4 md:text-xl text-gechis-gold mb-12'>
                  Discover the world of Gechis — where Market, Clothes, and
                  Beauty come together.
                </p>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            {departments.map((dept) => (
              <DepartmentCard key={dept.name} {...dept} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
