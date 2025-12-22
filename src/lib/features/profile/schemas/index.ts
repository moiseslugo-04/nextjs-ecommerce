import { z } from 'zod'
export const profileSchema = z.object({
  fullname: z.string().min(2).max(100).optional(),
  username: z.string().min(3).max(30).optional(),
  phone: z.string().min(7).max(15).optional(),
  birthdate: z.coerce.date().optional(),
  avatar: z.file().optional(),
})

export type ProfileInput = z.input<typeof profileSchema>
export type ProfileOutput = z.output<typeof profileSchema>
