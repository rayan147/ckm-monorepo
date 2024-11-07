import { z } from 'zod'
export  type { User } from '@ckm/db';
export const UserRoleEnum = z.enum(['ADMIN', 'MANAGER', 'CHEF', 'STAFF']);

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  passwordHash: z.string(),
  role: UserRoleEnum,
  restaurantId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserCreateSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true })

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export const UserUpdateSchema = UserCreateSchema.partial();
