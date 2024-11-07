import { z } from 'zod';

export const OrganizationSchema = z.object({
    id: z.number(),
    name: z.string(),
    imageUrl: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
  
  export const OrganizationCreateSchema = OrganizationSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
  })

  export const OrganizationUpdateSchema = OrganizationCreateSchema.partial();

  export type OrganizationCreateInput = z.infer<typeof OrganizationCreateSchema>;
  export type OrganizationUpdateInput = z.infer<typeof OrganizationUpdateSchema>;