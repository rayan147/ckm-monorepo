import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract()

export const orderContract = c.router({
  createOrder: {
    method: 'POST',
    path: '/orders',
    responses: {
      201: zodSchemas.OrderSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.OrderUncheckedCreateInputSchema,
    summary: 'Create a new order',
  },

  getOrders: {
    method: 'GET',
    path: '/orders',
    responses: {
      200: z.array(zodSchemas.OrderSchema),
    },
    query: z.object({
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
      orderBy: z.string().optional(),
      restaurantId: z.coerce.number().optional(),
      vendorId: z.coerce.number().optional(),
      status: z.enum(['PENDING', 'APPROVED', 'ORDERED', 'RECEIVED', 'CANCELLED']).optional(),
    }),
    summary: 'Get all orders',
  },

  getOrder: {
    method: 'GET',
    path: '/orders/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrderSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get an order by ID',
  },

  updateOrder: {
    method: 'PUT',
    path: '/orders/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrderSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.OrderUncheckedUpdateInputSchema,
    summary: 'Update an order',
  },

  deleteOrder: {
    method: 'DELETE',
    path: '/orders/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrderSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete an order',
  },
});

export type OrderType = z.infer<typeof zodSchemas.OrderSchema>
export type OrderCreate = z.infer<typeof zodSchemas.OrderUncheckedCreateInputSchema>
