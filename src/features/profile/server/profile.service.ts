import 'server-only'

import {
  getUserProfile,
  updateUserProfile,
} from '@/features/profile/server/profile.repository'
import { ProfileData, ProfileDTO } from '../types'
import { verifySession } from '@/lib/dal/session'

export async function getProfile(): Promise<ProfileDTO> {
  const session = await verifySession()
  if (!session.isAuthenticated) return null
  const profile = await getUserProfile(session.payload.id)
  if (!profile) return profile
  const avatarUrl = profile.avatar ? profile.avatar : profile.user.image
  profile.avatar = avatarUrl
  return {
    ...profile,
    name: profile.user.name,
    username: profile.user.username,
    addresses: profile.user.addresses,
    role: profile.user.role,
    avatar: avatarUrl ?? null,
    email: profile.user.email,
    createdAt: profile.user.createdAt,
  }
}

export async function updateProfile(userId: string, updates: ProfileData) {
  return await updateUserProfile(userId, updates)
}
