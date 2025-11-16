'use client'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useLogin } from '@/hooks/useLogin'
import Link from 'next/link'
export default function LoginPage() {
  const {
    errors,
    isLoading,
    showPassword,
    formData,
    onChange,
    handleSubmit,
    handleShowPassword,
    handleBlur,
  } = useLogin()
  return (
    <section className='grow bg-gray-50 py-16 px-4'>
      <div className='container-custom'>
        <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
          <div className='bg-gechis-blue p-6 text-white text-center'>
            <h1 className='text-2xl font-bold'>Welcome back</h1>
            <p className='text-gray-300 mt-1'>Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className='p-8'>
            {errors.login && (
              <div className='mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700'>
                Invalid credentials
              </div>
            )}

            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block text-gray-700 font-medium mb-2'
              >
                Email
              </label>
              <input
                type='text'
                id='identifier'
                name='identifier'
                className='input-field'
                placeholder='user@gmail.com'
                value={formData.identifier}
                onChange={onChange}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className='mb-8'>
              <div className='flex items-center justify-between mb-2'>
                <label
                  htmlFor='password'
                  className='block text-gray-700 font-medium'
                >
                  Password
                </label>
                <Link
                  href='/forgot-password'
                  className='text-sm text-gechis-gold hover:text-gechis-gold-dark'
                >
                  Forget my password
                </Link>
              </div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  className='input-field pr-10'
                  placeholder='**********'
                  value={formData.password}
                  onChange={onChange}
                  onBlur={handleBlur}
                  required
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                  onClick={handleShowPassword}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type='submit'
              className={`btn-primary w-full ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading && 'Lading...'}
              {!isLoading && <ArrowRight className='ml-2 h-5 w-5' />}
            </button>

            <div className='mt-6 text-center text-gray-600'>
              Do not have an account yet?
              <Link
                href='/auth/register'
                className='text-gechis-gold hover:text-gechis-gold-dark font-medium'
              >
                Sign up!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
