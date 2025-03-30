import { zodSchemas } from '@ckm/db';
import { z } from 'zod'

export type Restaurant = z.infer<typeof zodSchemas.RestaurantSchema>;
export type RestaurantCreate = z.infer<typeof zodSchemas.RestaurantCreateInputSchema>;
export type RestaurantUpdate = z.infer<typeof zodSchemas.RestaurantUpdateInputSchema>;
