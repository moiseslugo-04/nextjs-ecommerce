'use client'

import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FormCard } from '@/components/shared/FormCard'
import { FormField } from '@/components/shared/FormField'
import { AppLink } from '@/components/shared/AppLink'
import { AvatarPreview } from '@/components/shared/AvatarPreview'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@components/ui/dialog'
// ===== Types =====
type ProfileFormValues = {
  name: string
  username: string
  email: string
  phone?: string
  address?: string
  avatar?: FileList
}

// ===== Component =====
export function EditProfileForm() {
  const methods = useForm<ProfileFormValues>()
  const {
    formState: { isSubmitting },
    register,
  } = methods

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    const url = URL.createObjectURL(files[0])
    setAvatarPreview(url)
  }

  function onSubmit() {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='bg-blue-500 text-white font-semibold border-none'
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl border-none shadow-none'>
        <FormProvider {...methods}>
          <FormCard
            title='Profile Settings'
            description='Manage your personal information'
            onSubmit={onSubmit}
            className='gap-6'
            footer={
              <div className='flex w-full justify-between gap-3 '>
                <DialogClose asChild>
                  <Button
                    type='button'
                    variant='ghost'
                    className='rounded-lg bg-red-400 '
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-blue-500 rounded-lg text-white font-bold'
                >
                  Save changes
                </Button>
              </div>
            }
          >
            {/* Avatar Section */}
            <div className='flex flex-col sm:flex-row items-center justify-between sm:items-start gap-6  '>
              <AvatarPreview url={avatarPreview} />
              <div className=' flex flex-col gap-2 justify-between flex-1'>
                <h4 className='font-medium'>Profile Photo</h4>
                <p className='text-sm text-muted-foreground'>
                  Upload a professional photo for your account
                </p>
                <div className='flex items-center gap-3 pt-2'>
                  <input
                    type='file'
                    accept='image/*'
                    {...register('avatar')}
                    onChange={onFileChange}
                    className='hidden'
                    id='avatar'
                  />
                  <Label
                    htmlFor='avatar'
                    className='cursor-pointer rounded-xl border px-4 py-2 text-sm hover:bg-muted transition'
                  >
                    Change photo
                  </Label>
                  <span className='text-xs text-muted-foreground'>
                    PNG, JPG, max 5MB
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className='grid grid-cols-1  sm:grid-cols-2 gap-4 justify-between items-center'>
              <FormField
                name='fullname'
                label='Full name'
                placeholder='John Doe'
              />
              <FormField
                name='username'
                label='Username'
                placeholder='johndoe'
              />
              <FormField
                name='username'
                label='Email'
                placeholder='you@email.com'
                type='email'
              />
              <FormField
                name='phone'
                label='Phone'
                placeholder='+55 11 99999-9999'
                type='number'
              />
              <FormField
                name='address'
                label='Address'
                placeholder='Street, City, Country'
                type='text'
              />
            </div>
          </FormCard>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
