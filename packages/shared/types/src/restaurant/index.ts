import { zodSchemas } from '@ckm/db';
import { z } from 'zod'
import { OrganizationSchema } from '../organization';
import { UserSchema } from '../users';
import { CookBookSchema } from '../cookbook';
import { InventorySchema } from '../inventory';
import { OrderSchema } from '../order';

export type Restaurant = z.infer<typeof zodSchemas.RestaurantSchema>;
export type RestaurantCreate = z.infer<typeof zodSchemas.RestaurantCreateInputSchema>;
export type RestaurantUpdate = z.infer<typeof zodSchemas.RestaurantUpdateInputSchema>;
