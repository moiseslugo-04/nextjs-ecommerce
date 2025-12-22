import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateProfileAction } from '../server/profile.actions'

export function useProfileMutations() {
  const update = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: updateProfileAction,
    onError: (error) => {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!')
    },
  })
  return { update }
}
