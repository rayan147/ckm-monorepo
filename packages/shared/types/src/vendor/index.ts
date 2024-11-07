import { z } from 'zod';
import { OrderUpdateSchema } from '../order';


export const VendorSchema = z.object({
  id: z.number(),
  name: z.string(),
  contact: z.string(),
  email: z.string().email(),
  phone: z.string(),
  orders: z.array(OrderUpdateSchema),
//   ingredients: z.array(OrderUpdateSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const VendorCreateSchema = VendorSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  orders: true,
//   ingredients: true
});

export const VendorUpdateSchema = VendorCreateSchema.partial();

export type Vendor = z.infer<typeof VendorSchema>;
export type VendorCreate = z.infer<typeof VendorCreateSchema>;
export type VendorUpdate = z.infer<typeof VendorUpdateSchema>;