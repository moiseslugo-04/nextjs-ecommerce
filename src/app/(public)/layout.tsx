import Header from '@components/layouts/header/Header'
import Footer from '@components/layouts/footer/Footer'
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col min-h-s'>
      <Header />
      <main className='w-full grow flex justify-center'>{children}</main>
      <Footer />
    </div>
  )
}
