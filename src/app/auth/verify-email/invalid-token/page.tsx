import InvalidTokenCard from '@/components/InvalidTokenCard'

export default function InvalidVerifyTokenPage() {
  return (
    <InvalidTokenCard
      title='Invalid or Expired verify Token'
      description='Please enter your email and we’ll send a new  link to verify your email address'
      type='email_verification'
    />
  )
}
