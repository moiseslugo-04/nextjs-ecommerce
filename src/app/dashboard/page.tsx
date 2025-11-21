export default function DashboardPage() {
  return (
    <section className='flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50'>
      <div className='flex-1 flex flex-col items-center justify-center p-8'>
        <div className='text-center max-w-2xl mx-auto'>
          <div className='mb-8'>
            <div className='relative inline-flex'>
              <div className='w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center'>
                <svg
                  className='w-10 h-10 text-white animate-pulse'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <div className='absolute -top-2 -right-2'>
                <span className='flex h-6 w-6'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-6 w-6 bg-blue-500'></span>
                </span>
              </div>
            </div>
          </div>

          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Work in Progress
          </h1>

          <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
            We are currently building something amazing here. This dashboard
            section is under active development and will be available soon.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>Analytics</h3>
              <p className='text-gray-600 text-sm'>
                Detailed insights and performance metrics
              </p>
            </div>

            <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                  />
                </svg>
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>Management</h3>
              <p className='text-gray-600 text-sm'>
                Complete product and order management
              </p>
            </div>

            <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                  />
                </svg>
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>Users</h3>
              <p className='text-gray-600 text-sm'>
                Customer and team member management
              </p>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-md mx-auto'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-sm font-medium text-gray-700'>
                Development Progress
              </span>
              <span className='text-sm font-semibold text-blue-600'>65%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out'
                style={{ width: '65%' }}
              ></div>
            </div>
            <p className='text-xs text-gray-500 mt-3'>
              Estimated completion: 2-3 weeks
            </p>
          </div>

          <div className='mt-12'>
            <p className='text-gray-500 mb-4'>Need immediate assistance?</p>
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200'>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
