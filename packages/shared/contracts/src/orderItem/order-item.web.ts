import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { OrderItemCreateSchema, OrderItemSchema, OrderItemUpdateSchema } from '../../../types/src'

const c = initContract();



export const orderItemContract = c.router({
  createOrderItem: {
    method: 'POST',
    path: '/order-items',
    responses: {
      201: OrderItemSchema,
      400: z.object({ message: z.string() }),
    },
    body: OrderItemCreateSchema,
    summary: 'Create a new order item',
  },
  getOrderItems: {
    method: 'GET',
    path: '/order-items',
    responses: {
      200: z.array(OrderItemSchema),
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
      200: OrderItemSchema,
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
      200: OrderItemSchema,
      404: z.object({ message: z.string() }),
    },
    body: OrderItemUpdateSchema,
    summary: 'Update an order item',
  },
  deleteOrderItem: {
    method: 'DELETE',
    path: '/order-items/:id',
    pathParams: z.object({
        id: z.coerce.number()
    }),
    responses: {
      200: OrderItemSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete an order item',
  },
});
