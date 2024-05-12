import { z } from 'zod';

export const AuthFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email required!' })
    .email({ message: 'Invalid email!' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password required!' })
    .min(8, { message: 'Password must have at least 8 characters!' }),
  name: z.string().trim().min(1, { message: 'Name required!' }),
  terms: z.boolean().refine((value) => value, { message: 'Accept terms!' }),
});

export const getAuthSchema = (type: 'login' | 'register') =>
  type === 'login' ? AuthFormSchema.pick({ email: true, password: true }) : AuthFormSchema;

export type AuthFormValues<T extends 'login' | 'register'> = T extends 'login'
  ? {
      email: string;
      password: string;
    }
  : {
      email: string;
      name: string;
      password: string;
      terms: boolean;
    };
