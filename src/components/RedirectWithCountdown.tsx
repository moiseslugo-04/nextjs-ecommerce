'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface RedirectWithCountdownProps {
  to: string
  seconds?: number // duración del countdown
}

export default function RedirectWithCountdown({
  to,
  seconds = 5,
}: RedirectWithCountdownProps) {
  const [count, setCount] = useState(seconds)
  const router = useRouter()

  useEffect(() => {
    if (count === 0) {
      router.push(to)
      return
    }

    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, router, to])

  return (
    <p className='mt-4 text-gray-600'>
      Redirecting in <span className='font-bold'>{count}</span> second
      {count !== 1 ? 's' : ''}...
    </p>
  )
}
