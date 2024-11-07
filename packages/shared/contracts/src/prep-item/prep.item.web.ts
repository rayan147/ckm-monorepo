import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const prepItemContract = c.router({
  createPrepItem: {
    method: 'POST',
    path: '/prepItems',
    responses: {
      201: zodSchemas.PrepItemSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.PrepItemCreateInputSchema,
    summary: 'Create a new prep item',
  },
  getPrepItems: {
    method: 'GET',
    path: '/prepItems',
    responses: {
      200: z.array(zodSchemas.PrepItemSchema),
    },
    query: z.object({
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
      where: z.record(z.any()).optional(),
      orderBy: z.record(z.enum(['asc', 'desc'])).optional(),
    }),
    summary: 'Get all prep items',
  },
  getPrepItem: {
    method: 'GET',
    path: '/prepItems/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.PrepItemSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a prep item by ID',
  },
  updatePrepItem: {
    method: 'PUT',
    path: '/prepItems/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.PrepItemSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.PrepItemUpdateInputSchema,
    summary: 'Update a prep item',
  },
  deletePrepItem: {
    method: 'DELETE',
    path: '/prepItems/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a prep item',
  },
});
