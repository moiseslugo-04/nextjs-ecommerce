import 'server-only'
import { Address } from '@prisma/client'
import { addAddress, getAllAddresses } from './address.repository'
import { AddressSchema, addressSchema } from './schema'
import { verifySession } from '@/lib/dal/session'

export async function addUserAddress(userId: string, data: AddressSchema) {
  const parsedData = addressSchema.parse(data)
  return addAddress(userId, parsedData)
}

export async function getAllUserAddresses(): Promise<Address[]> {
  const session = await verifySession()
  if (!session.isAuthenticated) throw new Error('Unauthorized')
  return getAllAddresses(session.payload.id)
}
