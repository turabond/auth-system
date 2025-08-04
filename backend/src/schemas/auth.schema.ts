import { z } from 'zod';

export const authSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(16, 'Password must be at most 16 characters long'),
});

export type AuthSchemaType = z.infer<typeof authSchema>;
