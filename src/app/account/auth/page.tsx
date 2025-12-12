'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

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
export default function ProfessionalProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>()

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    const url = URL.createObjectURL(files[0])
    setAvatarPreview(url)
  }

  function onSubmit() {
    // Solo UI / diseño (sin lógica real)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='w-full flex justify-center'
    >
      <Card className='w-full max-w-4xl rounded-2xl shadow-lg border bg-background'>
        <CardHeader className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <CardTitle className='text-2xl'>Profile Settings</CardTitle>
            <p className='text-sm text-muted-foreground'>
              Manage your personal information
            </p>
          </div>
          <Button size='sm' variant='secondary' className='rounded-xl'>
            View public profile
          </Button>
        </CardHeader>

        <CardContent className='space-y-10'>
          {/* Avatar Section */}
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
            <Avatar className='h-28 w-28 ring-2 ring-muted'>
              {avatarPreview ? (
                <AvatarImage src={avatarPreview} />
              ) : (
                <AvatarFallback className='text-2xl'>U</AvatarFallback>
              )}
            </Avatar>

            <div className='flex-1 space-y-2'>
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

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label>Full name</Label>
                <Input
                  placeholder='John Doe'
                  {...register('name')}
                  className='rounded-xl'
                />
              </div>

              <div className='space-y-2'>
                <Label>Username</Label>
                <Input
                  placeholder='johndoe'
                  {...register('username')}
                  className='rounded-xl'
                />
              </div>

              <div className='space-y-2'>
                <Label>Email</Label>
                <Input
                  type='email'
                  placeholder='you@email.com'
                  {...register('email')}
                  className='rounded-xl'
                />
              </div>

              <div className='space-y-2'>
                <Label>Phone</Label>
                <Input
                  placeholder='+55 11 99999-9999'
                  {...register('phone')}
                  className='rounded-xl'
                />
              </div>

              <div className='md:col-span-2 space-y-2'>
                <Label>Address</Label>
                <Input
                  placeholder='Street, City, Country'
                  {...register('address')}
                  className='rounded-xl'
                />
              </div>
            </div>

            {/* Actions */}
            <div className='flex justify-end gap-3 pt-4'>
              <Button type='button' variant='ghost' className='rounded-xl'>
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='rounded-xl'
              >
                Save changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
