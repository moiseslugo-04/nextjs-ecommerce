'use server'

import { verifySession } from '@/lib/dal/session'
import { AddressSchema } from './schema'
import { addUserAddress } from './address.service'
import {
  deleteAddress,
  setDefaultAddress,
  updateAddress,
} from './address.repository'

export async function createAddressAction(data: AddressSchema) {
  const session = await verifySession()
  if (!session.isAuthenticated) throw new Error('Unauthorized')
  try {
    return await addUserAddress(session.payload.id, data)
  } catch (error) {
    console.error('Error creating address:', error)
    throw new Error('Failed to create address')
  }
}

export async function deleteAddressAction(id: string) {
  const session = await verifySession()
  if (!session.isAuthenticated) throw new Error('Unauthorized')
  try {
    await deleteAddress(id, session.payload.id)
  } catch (error) {
    console.error('Error deleting address:', error)
    throw new Error('Failed to delete address')
  }
}

export async function updateAddressAction({
  addressId,
  data,
}: {
  addressId: string
  data: AddressSchema
}) {
  const session = await verifySession()
  if (!session.isAuthenticated) throw new Error('Unauthorized')
  try {
    await updateAddress(addressId, session.payload.id, data)
  } catch (error) {
    console.error('Error updating address:', error)
    throw new Error('Failed to update address')
  }
}

export async function setDefaultAddressAction(addressId: string) {
  const session = await verifySession()
  if (!session.isAuthenticated) throw new Error('Unauthorized')
  try {
    await setDefaultAddress(addressId, session.payload.id)
  } catch (error) {
    console.error('Error updating address:', error)
    throw new Error('Failed to update address')
  }
}
