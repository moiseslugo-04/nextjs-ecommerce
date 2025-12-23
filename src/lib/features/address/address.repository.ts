import prisma from '@lib/client'
import { AddressSchema } from './schema'
// Address related functions
export async function getAllAddresses(userId: string) {
  return prisma.address.findMany({
    where: { userId },
    select: {
      address: true,
      id: true,
      country: true,
      city: true,
      postalCode: true,
      label: true,
      isDefault: true,
    },
  })
}

export async function addAddress(userId: string, data: AddressSchema) {
  return prisma.address.create({
    data: { ...data, userId },
    select: {
      address: true,
      id: true,
      country: true,
      city: true,
      postalCode: true,
      label: true,
      isDefault: true,
    },
  })
}

export async function deleteAddress(addressId: string, userId: string) {
  return prisma.address.delete({ where: { id: addressId, userId } })
}

export async function updateAddress(
  addressId: string,
  userId: string,
  data: AddressSchema
) {
  return prisma.address.update({
    where: { id: addressId, userId },
    data: {
      label: data.label,
      address: data.address,
      country: data.country,
      city: data.city,
      postalCode: data.postalCode,
    },
  })
}

export async function setDefaultAddress(addressId: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    //set all as false
    await tx.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    })
    //set default address
    await tx.address.update({
      where: {
        id_userId: {
          id: addressId,
          userId,
        },
      },
      data: { isDefault: true },
    })
  })
}
