import { useForm } from 'react-hook-form'
import { ProfileInput, profileSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

type ProfileFormPops = {
  defaultValues?: ProfileInput
}

export function useProfileForm({ defaultValues }: ProfileFormPops) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues,
  })

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    const MAX_SIZE = 1 * 1024 * 1024 // 1MB
    if (!files?.length) return
    if (files[0].size > MAX_SIZE) {
      form.setError('avatar', {
        message: 'Image must be smaller than 1MB',
      })
      e.target.value = ''
      return
    }
    form.clearErrors('avatar')
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(files[0])
    })
    form.setValue('avatar', files[0])
  }

  return { form, onFileChange, avatarPreview }
}
