'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FormCard } from '@/components/shared/FormCard'
import { FormField } from '@/components/shared/FormField'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useAddressFrom } from '@/lib/features/address/client/useAddressFrom'
import { useAddressMutations } from '@/lib/features/address/client/useAddressMutation'
import { useState } from 'react'

export function CreateAddressModal() {
  const [open, setOpen] = useState(false)
  const form = useAddressFrom()
  const { create } = useAddressMutations()
  const onSubmit = form.handleSubmit(async (data) =>
    create.mutate(data, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  )
  const isPending = create.isPending
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className='sr-only'>Add New Address</DialogTitle>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='bg-blue-500 text-white font-semibold border-none'
        >
          Add address
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl border-none shadow-none '>
        <FormProvider {...form}>
          <FormCard
            title='Add New Address'
            description='Please fill in the details below to add a new address to your account.'
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
                  disabled={isPending}
                  className='bg-blue-500 rounded-lg text-white font-bold'
                >
                  {isPending ? 'Adding new address...' : 'Add new Address'}
                </Button>
              </div>
            }
          >
            <Separator />

            <div className='grid grid-cols-1  sm:grid-cols-2 gap-4 justify-between items-center'>
              <FormField
                name='label'
                label='Label'
                placeholder='Home, Work, etc.'
              />

              <FormField
                name='postalCode'
                label='Postal Code or ZIP'
                placeholder='78900'
              />
              <FormField
                name='address'
                label='Address Line'
                placeholder='new street, building, apartment, etc.'
              />
              <FormField name='country' label='Country' placeholder='Brazil' />
              <FormField name='city' label='City' placeholder='City' />
            </div>
          </FormCard>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
