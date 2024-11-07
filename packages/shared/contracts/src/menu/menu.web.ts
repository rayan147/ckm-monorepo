import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

// export const zodSchemas.MenuSchema = z.object({
//   id: z.number().int(),
//   name: z.string(),
//   restaurantId: z.number().int(),
//   createdAt: z.coerce.date(),
//   updatedAt: z.coerce.date(),
// })

export const menuContract = c.router({
  createMenu: {
    method: 'POST',
    path: '/menus',
    responses: {
      201: zodSchemas.MenuSchema,
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      name: z.string(),
      restaurantId: z.number(),
    }),
    summary: 'Create a new menu',
  },
  getMenus: {
    method: 'GET',
    path: '/menus',
    responses: {
      200: z.array(zodSchemas.MenuSchema),
    },
    query: z.object({
      restaurantId: z.coerce.number().optional(),
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
    }),
    summary: 'Get all menus',
  },
  getMenu: {
    method: 'GET',
    path: '/menus/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.MenuSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a menu by ID',
  },
  updateMenu: {
    method: 'PUT',
    path: '/menus/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.MenuSchema,
      404: z.object({ message: z.string() }),
    },
    body: z.object({
      name: z.string().optional(),
    }),
    summary: 'Update a menu',
  },
  deleteMenu: {
    method: 'DELETE',
    path: '/menus/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a menu',
  },
});
