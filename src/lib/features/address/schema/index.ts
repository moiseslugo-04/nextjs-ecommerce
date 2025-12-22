import { z } from 'zod'

export const addressSchema = z.object({
  label: z.string().max(100),
  address: z.string().max(255),
  country: z.string().max(100),
  city: z.string().max(100),
  postalCode: z.string().min(4).max(10).nullable(),
})

export type AddressSchema = z.infer<typeof addressSchema>
