
import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { zodSchemas } from '@ckm/db';

const c = initContract();


export const restaurantDetailContract = c.router({
  getRestaurant: {
    method: 'GET',
    path: '/restaurants/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      // Use simplified schema for the contract
      // The actual implementation will still validate against the full schema
      200: zodSchemas.RestaurantSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a restaurant by ID',
  },
  updateRestaurant: {
    method: 'PUT',
    path: '/restaurants/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.RestaurantSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.RestaurantUpdateInputSchema,
    summary: 'Update a restaurant',
  },
  deleteRestaurant: {
    method: 'DELETE',
    path: '/restaurants/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.RestaurantSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a restaurant',
  },
});

