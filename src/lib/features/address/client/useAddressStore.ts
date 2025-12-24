import { create } from 'zustand'
import { AddressSchema } from '../schema'
import { AddressDTO } from '../types'

type AddressState = {
  addresses: AddressDTO[]
  hydrated: boolean
}
type AddressActions = {
  addOptimistic: (data: AddressDTO) => void
  removeOptimistic: (addressId: string) => void
  updateOptimistic: (addressId: string, updates: AddressSchema) => void
  replaceTemp: (tempId: string, addressRes: AddressDTO) => void
  setAsDefault: (addressId: string) => void
  hydrate: (address: AddressDTO[]) => void
  rollback: (address: AddressDTO[]) => void
}
type AddressStore = AddressState & AddressActions
export const useAddressStore = create<AddressStore>()((set) => ({
  addresses: [],
  hydrated: false,
  hydrate: (data) => set({ addresses: data, hydrated: true }),
  addOptimistic: (newAddress) =>
    set((state) => ({ addresses: [newAddress, ...state.addresses] })),
  removeOptimistic: (addressId) =>
    set((state) => ({
      addresses: state.addresses.filter(({ id }) => id !== addressId),
    })),
  setAsDefault: (addressId) =>
    set((state) => ({
      addresses: state.addresses.map((address) => {
        return address.id === addressId
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      }),
    })),
  updateOptimistic: (addressId, updates) => {
    set((state) => ({
      addresses: state.addresses.map((address) => {
        return address.id === addressId ? { ...address, ...updates } : address
      }),
    }))
  },
  replaceTemp: (tempId, addressRes) =>
    set((state) => ({
      addresses: state.addresses.map((address) =>
        address.id === tempId ? addressRes : address
      ),
    })),
  rollback: (prevState) => set({ addresses: prevState }),
}))
