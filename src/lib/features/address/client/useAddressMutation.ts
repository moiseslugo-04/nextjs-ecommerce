import { useMutation } from '@tanstack/react-query'
import {
  createAddressAction,
  deleteAddressAction,
  setDefaultAddressAction,
  updateAddressAction,
} from '../address.actions'
import { toast } from 'sonner'
export function useAddressMutations() {
  const create = useMutation({
    mutationFn: createAddressAction,
    mutationKey: ['create-address'],
    onError: (err) => {
      console.error('Error creating address:', err)
      toast.error('Failed to create address')
    },
    onSuccess: () => {
      toast.success('Address created successfully')
    },
  })
  const setAsDefault = useMutation({
    mutationFn: setDefaultAddressAction,
    mutationKey: ['set-as-default-address'],
    onSuccess: () => {
      toast.success('Address set as default successfully')
    },
    onError: (err) => {
      console.error('Error setting address as default:', err)
      toast.error('Failed to set address as default')
    },
  })
  const updateAddress = useMutation({
    mutationFn: updateAddressAction,
    mutationKey: ['update-address'],
    onSuccess: () => {
      toast.success('Address updated successfully')
    },
    onError: (err) => {
      console.error('Error updating address:', err)
      toast.error('Failed to update address')
    },
  })
  const removeAddress = useMutation({
    mutationFn: deleteAddressAction,
    mutationKey: ['remove-address'],
    onSuccess: () => {
      toast.success('Address removed successfully')
    },
    onError: (err) => {
      console.error('Error removing address:', err)
      toast.error('Failed to remove address')
    },
  })
  return { create, setAsDefault, updateAddress, removeAddress }
}
