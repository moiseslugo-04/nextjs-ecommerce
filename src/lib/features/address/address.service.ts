import 'server-only'
import { addAddress, getAllAddresses } from './address.repository'
import { AddressSchema, addressSchema } from './schema'
import { verifySession } from '@/lib/dal/session'
import { AddressDTO } from './types'

export async function addUserAddress(userId: string, data: AddressSchema) {
  const parsedData = addressSchema.parse(data)
  return addAddress(userId, parsedData)
}
export async function getAllUserAddresses(): Promise<AddressDTO[]> {
  const session = await verifySession()
  if (!session.isAuthenticated) throw new Error('Unauthorized')
  return getAllAddresses(session.payload.id)
}
