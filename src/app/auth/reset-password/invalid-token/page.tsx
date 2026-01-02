import InvalidTokenCard from '@/components/InvalidTokenCard'

export default function InvalidResetTokenPage() {
  return (
    <InvalidTokenCard
      title='Invalid or expired password reset token'
      description='Enter your email and we’ll send a password reset link.'
      type='reset_password'
    />
  )
}
