'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddressSchema, addressSchema } from '../schema'
export function useAddressFrom(defaultValues?: AddressSchema) {
  return useForm({
    resolver: zodResolver(addressSchema),
    mode: 'onBlur',
    defaultValues,
  })
}
