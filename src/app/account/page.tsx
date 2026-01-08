import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { EditProfileForm } from '@/features/profile/components/EditProfileForm'
import { getProfile } from '@/features/profile/server/profile.service'
import { InfoItem } from '@/components/shared/InfoItem'
import { InfoSection } from '@/components/shared/InfoSession'

export default async function ProfilePage() {
  const profile = await getProfile()
  if (!profile) return <p>Something was wrong please trying later</p>
  return (
    <div className=' flex justify-center py-10 px-4'>
      <Card className='w-full max-w-4xl border-none rounded-2xl bg-white/70 backdrop-blur-sm p-8'>
        {/* Top Right Button */}
        <div className='flex justify-end mb-6 mr-3'>
          <EditProfileForm profile={profile} />
        </div>
        {/* Header */}
        <CardHeader className='flex flex-col items-center text-center gap-4 mb-10'>
          <Avatar className='h-28 w-28 ring-2 ring-neutral-200 shadow-md'>
            <AvatarImage src={profile.avatar ?? ''} alt='profile avatar' />
            <AvatarFallback className='text-3xl'>
              {profile?.email?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className='space-y-1'>
            <CardTitle className='text-3xl font-semibold text-neutral-900'>
              {profile?.fullName ?? profile.email}
            </CardTitle>

            <p className='text-sm text-neutral-500'>
              {profile.username ? `@${profile.username}` : 'Not provided'}
            </p>

            <div className='flex justify-center'>
              <Badge
                variant='secondary'
                className='rounded-full px-4 py-1 text-xs font-medium'
              >
                {profile.role}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <Separator className='my-10' />

        <CardContent className='space-y-14'>
          {/* Personal Info */}
          <InfoSection title='Personal information'>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2'>
              <InfoItem
                label='Full name'
                value={profile?.fullName ?? 'Not Provided'}
              />
              <InfoItem
                label='Username'
                value={profile.username ?? 'Not provided'}
              />
              <InfoItem
                label='Email address'
                value={profile.email ?? 'Not provided'}
              />
              <InfoItem label='Phone' value={profile?.phone ?? 'Not added'} />
              <InfoItem
                label='Date of birth'
                value={profile?.birthdate?.toDateString() ?? 'Not Set'}
              />
            </div>
          </InfoSection>

          <Separator />

          {/* Account Info */}
          <InfoSection title='Account details'>
            <div className='flex justify-between w-full items-center px-2'>
              <InfoItem
                label='Account created'
                value={profile.createdAt?.toDateString()}
              />
              <InfoItem label='Account role' value={profile.role} />
            </div>
          </InfoSection>
        </CardContent>
      </Card>
    </div>
  )
}
