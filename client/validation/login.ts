import { z } from 'zod'
import { INVALID_EMAIL, PASSWORD_LENGTH } from './messageCode/authentication'

export const LoginSchema = z.object({
  email: z.string().email(INVALID_EMAIL),
  password: z.string().min(8, PASSWORD_LENGTH),
})
