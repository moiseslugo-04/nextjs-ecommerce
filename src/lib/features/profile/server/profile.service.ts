import {
  getUserProfile,
  saveProfile,
} from '@features/profile/server/profile.repository'
import { ProfilePayload } from '../types'

export async function createProfile(profile: ProfilePayload) {
  const existingProfile = await getUserProfile(profile.userId)
  if (!existingProfile) await saveProfile(profile)
}
