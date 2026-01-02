import InvalidTokenCard from '@/components/InvalidTokenCard'

export default function SetPasswordInvalidToken() {
  return (
    <InvalidTokenCard
      title='Invalid or expired set password token'
      description='Enter your email and we’ll send a password set link.'
      type='set_password'
    />
  )
}
