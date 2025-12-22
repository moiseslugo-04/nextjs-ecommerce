'use server'
import { ProfileInput, profileSchema } from '../schemas'
import { updateProfile } from './profile.service'
import { ProfileData } from '../types'
import { verifySession } from '@/lib/dal/session'
import { uploadImage } from '@features/media/media.service'
import { revalidatePath } from 'next/cache'
export async function updateProfileAction(data: ProfileInput) {
  const session = await verifySession()
  if (!session.isAuthenticated) throw new Error('Unauthorized')
  const parsedData = profileSchema.safeParse(data)
  const res = await uploadImage(data.avatar as File)
  if (!parsedData.success) throw new Error('Invalid profile data')
  const updatedData = { ...parsedData.data, avatar: res?.url } as ProfileData
  await updateProfile(session.payload.id, updatedData)
  revalidatePath('/account')
}
