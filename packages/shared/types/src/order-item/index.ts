import { z } from 'zod';


export const OrderItemSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  ingredientId: z.number(),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
});

export const OrderItemCreateSchema = OrderItemSchema.omit({ id: true });
export const OrderItemUpdateSchema = OrderItemSchema.partial().omit({ id: true, orderId: true });

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderItemCreate = z.infer<typeof OrderItemCreateSchema>;
export type OrderItemUpdate = z.infer<typeof OrderItemUpdateSchema>;