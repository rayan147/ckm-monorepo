import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const ingredientContract = c.router({
  createIngredient: {
    method: 'POST',
    path: '/ingredients',
    responses: {
      201: zodSchemas.IngredientSchema,
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      name: z.string(),
      category: z.string(),
      price: z.number(),
    }),
    summary: 'Create a new ingredient',
  },
  getIngredients: {
    method: 'GET',
    path: '/ingredients',
    responses: {
      200: z.array(zodSchemas.IngredientSchema),
    },
    query: z.object({
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
      where: z.record(z.any()).optional(),
      orderBy: z.record(z.enum(['asc', 'desc'])).optional(),
    }),
    summary: 'Get all ingredients',
  },
  getIngredient: {
    method: 'GET',
    path: '/ingredients/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.IngredientSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get an ingredient by ID',
  },
  updateIngredient: {
    method: 'PUT',
    path: '/ingredients/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.IngredientSchema,
      404: z.object({ message: z.string() }),
    },
    body: z.object({
      name: z.string().optional(),
      category: z.string().optional(),
      price: z.number().optional(),
    }),
    summary: 'Update an ingredient',
  },
  deleteIngredient: {
    method: 'DELETE',
    path: '/ingredients/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete an ingredient',
  },
});
