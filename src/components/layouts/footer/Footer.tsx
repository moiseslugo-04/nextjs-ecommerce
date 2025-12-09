import Company from './Company'
import Products from './Products'
import Contact from './Contact'
import Media from './Media'
import Copyright from './Copyright'
export default function Footer() {
  return (
    <footer className='bg-gechis-blue text-white py-8 px-6 mb-0'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
        <Media />
        <div className='grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_2fr] gap-3 pt-8 max-w-4xl'>
          <Company />
          <Products />
          <div className='col-span-2  sm:col-auto'>
            <Contact />
          </div>
        </div>
        <Copyright />
      </div>
    </footer>
  )
}
