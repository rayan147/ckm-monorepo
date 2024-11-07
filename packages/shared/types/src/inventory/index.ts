import { z } from 'zod';

export const InventorySchema = z.object({
    id: z.number(),
    restaurantId: z.number(),
  });
  
  
  export const InventoryItemSchema = z.object({
    id: z.number(),
    inventoryId: z.number(),
    ingredientId: z.number(),
    quantity: z.number(),
    unit: z.string(),
    minQuantity: z.number(),
    lastUpdated: z.date(),
  });