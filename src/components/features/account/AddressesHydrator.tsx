/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useAddressStore } from '@/lib/features/address/client/useAddressStore'
import { AddressDTO } from '@/lib/features/address/types'
import { useEffect } from 'react'

type AddressesHydratorProps = {
  initialAddress: AddressDTO[]
}
export function AddressesHydrator({ initialAddress }: AddressesHydratorProps) {
  const { hydrate } = useAddressStore()
  useEffect(() => {
    hydrate(initialAddress)
  }, [])
  return null
}
