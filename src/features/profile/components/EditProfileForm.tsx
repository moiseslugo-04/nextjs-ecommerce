'use client'

import { Controller, FormProvider } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FormCard } from '@/components/shared/FormCard'
import { FormField } from '@/components/shared/FormField'
import { AvatarPreview } from '@/components/shared/AvatarPreview'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@components/ui/dialog'
import { FieldControl } from '@/components/shared/FieldControl'
import { ProfileDTO } from '@/features/profile/types'
import { useProfileForm } from '@/features/profile/hooks/useProfileFrom'
import { useProfileMutations } from '@/features/profile/hooks/useProfileMutation'
import { useState } from 'react'

export function EditProfileForm({ profile }: { profile: ProfileDTO }) {
  const [open, setOpen] = useState(false)
  const { update } = useProfileMutations()
  const { form, onFileChange, avatarPreview } = useProfileForm({
    defaultValues: {
      fullname: profile?.fullName ?? '',
      username: profile?.username ?? '',
      phone: profile?.phone ?? '',
    },
  })
  const onSubmit = form.handleSubmit(async (result) =>
    update.mutate(result, { onSuccess: () => setOpen(false) })
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='bg-blue-500 text-white font-semibold border-none'
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl border-none shadow-none'>
        <FormProvider {...form}>
          <FormCard
            title='Profile Settings'
            description='Manage your personal information'
            onSubmit={onSubmit}
            className='gap-6'
            footer={
              <div className='flex w-full justify-between gap-3 '>
                <DialogClose asChild>
                  <Button
                    onClick={() => form.reset()}
                    type='button'
                    variant='ghost'
                    className='rounded-lg bg-red-400 '
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type='submit'
                  disabled={update.isPending}
                  className='bg-blue-500 rounded-lg text-white font-bold'
                >
                  Save changes
                </Button>
              </div>
            }
          >
            {/* Avatar Section */}
            <div className='flex flex-col sm:flex-row items-center justify-between sm:items-start gap-6  '>
              <AvatarPreview
                url={
                  !avatarPreview
                    ? (profile?.avatar ?? avatarPreview)
                    : avatarPreview
                }
              />
              <div className=' flex flex-col gap-2 justify-between flex-1'>
                <h4 className='font-medium'>Profile Photo</h4>

                {form.formState.errors.avatar ? (
                  <span className='text-red-600/80 text-sm'>
                    {form.formState.errors.avatar?.message}
                  </span>
                ) : (
                  <p className='text-sm text-muted-foreground'>
                    Upload a professional photo for your account
                  </p>
                )}

                <div className='flex pt-3 items-center justify-between  '>
                  <div className='hidden'>
                    <Controller
                      name={'avatar'}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FieldControl
                          field={{ ...field }}
                          fieldState={fieldState}
                          onChange={onFileChange}
                          type={'file'}
                          id='avatar'
                          accept='image/*'
                          className=' hidden w-0!  h-0!'
                        />
                      )}
                    />
                  </div>
                  <Label
                    htmlFor='avatar'
                    className=' cursor-pointer rounded-xl border px-4 py-2 text-sm hover:bg-muted transition'
                  >
                    Change photo
                  </Label>
                  <p className='text-xs text-muted-foreground'>
                    PNG, JPG, max 5MB
                  </p>
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
                name='phone'
                label='Phone'
                placeholder='+55 11 99999-9999'
                type='number'
              />
              <FormField
                name='birthdate'
                label='Birthdate'
                placeholder='Select your birthdate'
                type='date'
              />
            </div>
          </FormCard>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
