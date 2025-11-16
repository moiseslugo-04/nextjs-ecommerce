import { Mail, Phone, MapPin } from 'lucide-react'
export default function Contact() {
  return (
    <div>
      <h3 className='text-lg font-semibold mb-6'>Contact</h3>
      <ul className='space-y-4'>
        <li className='flex items-center'>
          <Mail size={18} className='mr-2 text-gechis-gold' />
          <a
            href='mailto:info@gechis.com'
            className='text-gray-300 hover:text-gechis-gold transition duration-300'
          >
            gechiscompany.com
          </a>
        </li>
        <li className='flex items-center'>
          <Phone size={18} className='mr-2 text-gechis-gold' />
          <a
            href='tel:+11234567890'
            className='text-gray-300 hover:text-gechis-gold transition duration-300'
          >
            +55 (83) 991-336-039
          </a>
        </li>
        <li className='flex items-start'>
          <MapPin size={18} className='mr-2 mt-1 text-gechis-gold' />
          <span className='text-gray-300'>
            Avenida Empresarial 123, Sala 100
            <br />
            Brasil, João Pessoa, Paraíba
          </span>
        </li>
      </ul>
    </div>
  )
}
