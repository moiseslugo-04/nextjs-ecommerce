import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
export const emailSchema = z.object({
  email: z.email('Invalid email address').trim(),
})
export type EmailSchema = z.infer<typeof emailSchema>

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string('Confirm Password Please').trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .strict()

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export const loginSchema = z
  .object({
    identifier: z
      .string('Username or email is required')
      .min(4, 'Username or email is required')
      .trim(),
    password: z
      .string('Password is required')
      .min(6, 'Password is required')
      .trim(),
  })
  .strict()
export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be at most 50 characters long')
      .trim(),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be at most 20 characters long')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      )
      .trim(),
    email: z.email('Invalid email address').trim(),
    password: passwordSchema,
    confirmPassword: z.string('Confirm Password Please').trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .strict()

export type RegisterSchema = z.infer<typeof registerSchema>
