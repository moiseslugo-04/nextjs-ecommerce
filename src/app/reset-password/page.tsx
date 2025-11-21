// import { tokenServices } from '@/lib/services/TokenServices'

export default async function ResetPasswordPage() {
  /*   const { token } = await searchParams
  if (!token) return <h1>Where is messi</h1>
  // we need to call our authServices to validate the toke n
  const result = await tokenServices.validate(token)
  // base on the response we decided what  to do!
  if (!result.success && !result.token)
    return console.log('Invalid token please check yor email and trying again')
  if (result.success && result.expired)
    return console.log('token expired please, go to resend Page')
  // if Token is valid show the <ResetPasswordForm/> */
  return <h1>Hello world</h1>
}
