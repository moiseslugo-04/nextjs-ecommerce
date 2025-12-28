/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useAddressStore } from '../hooks/useAddressStore'
import { AddressDTO } from '../types'
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
