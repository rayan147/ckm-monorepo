import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const restaurantContract = c.router({
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
  getRestaurant: {
    method: 'GET',
    path: '/restaurants/:id',
    pathParams: z.object({
        id: z.coerce.number()
    }),
    responses: {
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

