import { useMutation } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import {
  createAddressAction,
  deleteAddressAction,
  setDefaultAddressAction,
  updateAddressAction,
} from '../address.actions'
import { useAddressStore } from '@lib/features/address/client/useAddressStore'
import { AddressDTO } from '../types'
export function useAddressMutations() {
  const create = useMutation({
    mutationFn: createAddressAction,
    mutationKey: ['create-address'],
    onMutate: (data) => {
      const tempId = `temp-${nanoid()}`
      const optimisticAddress: AddressDTO = {
        ...data,
        id: tempId,
        isDefault: false,
      }
      //Snapshot the previous value
      const rollback = useAddressStore.getState().addresses
      useAddressStore.getState().addOptimistic(optimisticAddress)
      return { tempId, rollback }
    },

    onError: (err, __, context) => {
      if (context?.rollback) {
        useAddressStore.getState().rollback(context.rollback)
      }
    },
    onSuccess: (addressRes, __, context) => {
      useAddressStore.getState().replaceTemp(context.tempId, addressRes)
    },
  })
  const setAsDefault = useMutation({
    mutationFn: setDefaultAddressAction,
    mutationKey: ['set-as-default-address'],
    onMutate: (addressId) => {
      //Snapshot the previous value
      const rollback = useAddressStore.getState().addresses
      useAddressStore.getState().setAsDefault(addressId)
      return { rollback }
    },

    onError: (err, _, context) => {
      if (context?.rollback) {
        useAddressStore.getState().rollback(context.rollback)
      }
      console.error('Error setting address as default:', err)
    },
  })
  const updateAddress = useMutation({
    mutationFn: updateAddressAction,
    mutationKey: ['update-address'],
    onMutate: ({ addressId, data }) => {
      //Snapshot the previous value
      const rollback = useAddressStore.getState().addresses
      //optimistic update

      useAddressStore.getState().updateOptimistic(addressId, data)
      return { rollback }
    },
    onError: (err, _, context) => {
      if (context?.rollback) {
        useAddressStore.getState().rollback(context.rollback)
      }
      console.error('Error updating address:', err)
    },
  })
  const removeAddress = useMutation({
    mutationFn: deleteAddressAction,
    mutationKey: ['remove-address'],
    onMutate: (addressId) => {
      //Snapshot the previous value
      const rollback = useAddressStore.getState().addresses
      //optimistic Update
      useAddressStore.getState().removeOptimistic(addressId)
      return { rollback }
    },
    onError: (err, _, context) => {
      if (context?.rollback) {
        useAddressStore.getState().rollback(context.rollback)
      }
      console.error('Error removing address:', err)
    },
  })
  return { create, setAsDefault, updateAddress, removeAddress }
}
