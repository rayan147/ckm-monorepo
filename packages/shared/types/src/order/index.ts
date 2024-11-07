import { z } from 'zod';
import { zodSchemas } from '@ckm/db';
import { OrderItemSchema } from '../order-item';


export const OrderStatusEnum = z.enum(['PENDING', 'APPROVED', 'ORDERED', 'RECEIVED', 'CANCELLED']);




const VendorSchema = z.object({
  id: z.number(),
  name: z.string(),
  // Add other relevant fields
});


// Main Order schema
export const OrderSchema = z.object({
  id: z.number(),
  restaurantId: z.number(),
  vendorId: z.number(),
  vendor: VendorSchema,
  status: OrderStatusEnum,
  items: z.array(OrderItemSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});


export const OrderCreateSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

// Schema for updating an existing order
export const OrderUpdateSchema = OrderCreateSchema.partial()

export type Order = z.infer<typeof OrderSchema>;
export type OrderCreate = z.infer<typeof OrderCreateSchema>;
export type OrderUpdate = z.infer<typeof OrderUpdateSchema>;
export type OrderCreateInput = z.infer<typeof zodSchemas.OrderUncheckedCreateInputSchema>;
export type OrderUpdateInput = z.infer<typeof zodSchemas.OrderUncheckedUpdateInputSchema>;
