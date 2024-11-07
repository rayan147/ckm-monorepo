import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const cookbookContract = c.router({
  createCookBook: {
    method: 'POST',
    path: '/cookbooks',
    responses: {
      201: zodSchemas.CookBookSchema,
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      name: z.string(),
      imageUrl: z.string().optional(),
      category: z.string(),
      restaurantId: z.number().optional(),
    }),
    summary: 'Create a new cookbook',
  },
  getCookBooks: {
    method: 'GET',
    path: '/cookbooks',
    responses: {
      200: z.array(zodSchemas.CookBookSchema),
    },
    query: z.object({
      restaurantId: z.coerce.number().optional(),
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
    }),
    summary: 'Get all cookbooks',
  },
  getCookBook: {
    method: 'GET',
    path: '/cookbooks/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.CookBookSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a cookbook by ID',
  },
  updateCookBook: {
    method: 'PUT',
    path: '/cookbooks/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.CookBookSchema,
      404: z.object({ message: z.string() }),
    },
    body: z.object({
      name: z.string().optional(),
      imageUrl: z.string().optional(),
      category: z.string().optional(),
      restaurantId: z.number().optional(),
    }),
    summary: 'Update a cookbook',
  },
  deleteCookBook: {
    method: 'DELETE',
    path: '/cookbooks/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a cookbook',
  },
});
