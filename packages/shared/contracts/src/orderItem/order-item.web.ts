import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { zodSchemas } from '@ckm/db';

const c = initContract();



export const orderItemContract = c.router({
  createOrderItem: {
    method: 'POST',
    path: '/order-items',
    responses: {
      201: zodSchemas.OrderItemSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.OrderItemCreateInputSchema,
    summary: 'Create a new order item',
  },
  getOrderItems: {
    method: 'GET',
    path: '/order-items',
    responses: {
      200: z.array(zodSchemas.OrderItemSchema),
    },
    query: z.object({
      orderId: z.string().optional(),
      skip: z.string().optional(),
      take: z.string().optional(),
    }),
    summary: 'Get all order items',
  },
  getOrderItem: {
    method: 'GET',
    path: '/order-items/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrderItemSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get an order item by ID',
  },
  updateOrderItem: {
    method: 'PUT',
    path: '/order-items/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrderItemSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.OrderItemUpdateInputSchema,
    summary: 'Update an order item',
  },
  deleteOrderItem: {
    method: 'DELETE',
    path: '/order-items/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrderItemSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete an order item',
  },
});
