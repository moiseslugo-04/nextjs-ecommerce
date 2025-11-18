import { z } from 'zod'
export const loginSchema = z.object({
  identifier: z
    .string()
    .min(4, 'username or email must be  at least 4 characters'),
  password: z.string().min(6, 'password must be at least 6 characters '),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z.string().min(4),
    lastName: z.string().min(4),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  })
export type RegisterSchema = z.infer<typeof registerSchema>
