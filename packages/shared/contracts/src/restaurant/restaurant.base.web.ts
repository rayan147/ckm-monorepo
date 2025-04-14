
import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { zodSchemas } from '@ckm/db';

const c = initContract();

export const restaurantBaseContract = c.router({
  createRestaurant: {
    method: 'POST',
    path: '/restaurants',
    responses: {
      201: zodSchemas.RestaurantSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.RestaurantCreateInputSchema,
    summary: 'Create a new restaurant',
  },
  getRestaurants: {
    method: 'GET',
    path: '/restaurants',
    responses: {
      200: z.array(zodSchemas.RestaurantSchema),
    },
    query: z.object({
      skip: z.string().optional(),
      take: z.string().optional(),
      organizationId: z.string().optional(),
    }),
    summary: 'Get all restaurants',
  },
});

