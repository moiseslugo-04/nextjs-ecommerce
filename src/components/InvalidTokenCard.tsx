'use client'

import { resendEmailVerificationAction } from '@/lib/actions/resend/resendEmailVericationAction'
import { useState, useTransition } from 'react'
interface InvalidTokenProps {
  defaultEmail?: string
}
export default function InvalidTokenCard({ defaultEmail }: InvalidTokenProps) {
  const [email, setEmail] = useState(defaultEmail ?? '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPending, startTransition] = useTransition()
  async function onSubmit() {
    setError('')
    setSuccess('')
    try {
      startTransition(async () => {
        const res = await resendEmailVerificationAction(email)
        if (!res.success) throw new Error(res.message)
        setSuccess(res.message)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl border'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
        Invalid or expired link
      </h2>

      <p className='text-gray-600 mb-6'>
        Your verification link is invalid or has expired.
      </p>

      <div className='space-y-4'>
        <input
          type='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border rounded-lg px-4 py-2'
        />

        {error && <p className='text-red-600 text-sm'>{error}</p>}
        {success && <p className='text-green-600 text-sm'>{success}</p>}

        <button
          onClick={onSubmit}
          className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800'
        >
          {isPending ? 'Sending.....' : 'Send new verification email'}
        </button>
      </div>
    </div>
  )
}
