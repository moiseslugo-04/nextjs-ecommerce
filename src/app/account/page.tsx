import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { EditProfileForm } from '@components/features/account/EditProfileForm'
import { verifySession } from '@/lib/dal/session'
import { getUserProfile } from '@/lib/features/profile/server/profile.repository'

export default async function ProfilePage() {
  const session = await verifySession()
  if (!session.isAuthenticated) return null
  const profile = await getUserProfile(session.payload.id)
  if (!profile) return <p>Something was wrong please trying later</p>
  return (
    <div className=' flex justify-center py-10 px-4'>
      <Card className='w-full max-w-4xl border-none rounded-2xl bg-white/70 backdrop-blur-sm p-8'>
        {/* Top Right Button */}
        <div className='flex justify-end mb-6 mr-3'>
          <EditProfileForm />
        </div>
        {/* Header */}
        <CardHeader className='flex flex-col items-center text-center gap-4 mb-10'>
          <Avatar className='h-28 w-28 ring-2 ring-neutral-200 shadow-md'>
            {profile?.avatar ? (
              <AvatarImage src={profile.avatar} alt='profile avatar' />
            ) : (
              <AvatarFallback className='text-3xl'>
                {profile?.fullName?.slice(2)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className='space-y-1'>
            <CardTitle className='text-3xl font-semibold text-neutral-900'>
              {profile?.fullName ?? profile.user?.email}
            </CardTitle>

            <p className='text-sm text-neutral-500'>
              @{usernameGenerator(profile.user?.email)}
            </p>

            <div className='flex justify-center'>
              <Badge
                variant='secondary'
                className='rounded-full px-4 py-1 text-xs font-medium'
              >
                {profile.user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <Separator className='my-10' />

        <CardContent className='space-y-14'>
          {/* Personal Info */}
          <Section title='Personal information'>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2'>
              <InfoItem label='Full name' value={profile?.fullName} />
              <InfoItem
                label='Username'
                value={
                  profile?.user.username ??
                  usernameGenerator(profile.user?.email)
                }
              />
              <InfoItem label='Email address' value={profile.user?.email} />
              <InfoItem label='Phone' value={profile?.phone ?? 'none'} />
              <InfoItem
                label='Date of birth'
                value={String(profile?.birthdate)}
              />
              <InfoItem label='Address' value={String(profile.address) ?? ''} />
            </div>
          </Section>

          <Separator />

          {/* Account Info */}
          <Section title='Account details'>
            <div className='flex justify-between w-full items-center px-2'>
              <InfoItem
                label='Account created'
                value={profile?.user.createdAt?.toDateString()}
              />
              <InfoItem label='Account role' value={profile.user.role} />
            </div>
          </Section>
        </CardContent>
      </Card>
    </div>
  )
}

/* -------------------- Sub Components -------------------- */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className='space-y-5'>
      <h3 className='text-xl font-semibold text-neutral-900 tracking-tight'>
        {title}
      </h3>
      {children}
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className='space-y-1'>
      <p className='text-lg font-medium text-gray-700 '>{label}</p>
      <p className='text-md font-semibold text-neutral-900'>
        {value || <span className='text-blue-400 font-bold'>undefined</span>}
      </p>
    </div>
  )
}

/* -------------------- Helpers -------------------- */

function usernameGenerator(email?: string) {
  if (!email?.trim()) return 'Unknown'
  return email.split('@')[0]
}
