'use client'
import { useState } from 'react'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { replace } = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setIsLoading(true)
      // Here you would typically make an API call to register the user
      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      replace('/login')
      // !add Error handle
      // !add Error handle
    } catch {
      setError('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='flex justify-center items-center bg-gray-50  px-4 py-'>
      <div className='container-custom'>
        <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
          <div className='bg-gechis-blue p-6 text-white text-center'>
            <h1 className='text-2xl font-bold'>Create Account</h1>
            <p className='text-gray-300 mt-1'>Join the Gechis Community</p>
          </div>

          <form onSubmit={handleSubmit} className='p-8'>
            {error && (
              <div className='mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700'>
                {error}
              </div>
            )}

            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  className='input-field'
                  placeholder='Moises'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='lastName'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Last Name
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  className='input-field'
                  placeholder='Lugo'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block text-gray-700 font-medium mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='input-field'
                placeholder='moiseslugo9134@gmail.com'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-gray-700 font-medium mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  className='input-field pr-10'
                  placeholder='********'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className='mb-8'>
              <label
                htmlFor='confirmPassword'
                className='block text-gray-700 font-medium mb-2'
              >
                Confirm password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                className='input-field'
                placeholder='********'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type='submit'
              className={`btn-primary w-full ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              {!isLoading && <ArrowRight className='ml-2 h-5 w-5' />}
            </button>

            <div className='mt-6 text-center text-gray-600'>
              Do you already have an account?
              <Link
                href='/login'
                className='text-gechis-gold hover:text-gechis-gold-dark font-medium ml-2'
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
