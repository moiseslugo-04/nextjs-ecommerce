import Image from 'next/image'

export default function Mission() {
  return (
    <section className='py-12 px-4 bg-gray-50'>
      <div className='container-custom'>
        <div className='grid md:grid-cols-2 gap-12 md:gap-20 items-center'>
          <div>
            <h2 className='text-3xl font-bold mb-6 text-gechis-blue'>
              Our Mission
            </h2>
            <div className='text-gray-700 space-y-6 leading-relaxed max-w-prose'>
              <p>
                At <strong>Gechis</strong>, our mission is to redefine online
                shopping through innovation, transparency, and community. We
                believe technology should make consumption more conscious and
                accessible — not just easier.
              </p>
              <p>
                That’s why we’re building an ecosystem of essential products
                that empower people to live better every day. From sustainable
                fashion to daily market essentials and personal care, each
                category is designed to deliver quality, fairness, and value.
              </p>
              <p>
                Gechis is more than an e-commerce — it’s a new way of buying and
                connecting. Our goal is to make shopping a positive experience
                that supports people, the planet, and progress.
              </p>
            </div>
          </div>
          <div className='rounded-xl overflow-hidden shadow-xl'>
            <Image
              width={500}
              height={450}
              quality={100}
              src='/assets/images/about-mission.webp'
              alt='Gechis team collaboration'
              className='w-full h-auto object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
