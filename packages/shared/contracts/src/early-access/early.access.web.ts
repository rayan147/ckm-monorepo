import { zodSchemas } from '@ckm/db';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract()

export const earlyAccessContract = c.router({
  storeEmail: {
    method: 'POST',
    path:'/early-access',
    responses: {
      200: z.object({
        message: z.string(),
      }),
      401: z.object({ message: z.string() }),
    },
    body: z.object({
      email: z.string().email(),
    }),
    summary: 'Add potential customer to the database',
  },
  
  deleteEmail: {
    method: 'DELETE',
    path: '/early-access/:id',
    pathParams: z.object({
        id: z.coerce.number()
    }),
    responses: {
      200: z.object({
        email: z.string(),
      }),
      401: z.object({ message: z.string() }),
    },
    summary: 'Delete a potential customer from the database',
  },
  getEmails: {
    method: 'GET',
    path: '/early-access',
    responses: {
      201: z.array(zodSchemas.EarlyAccessSchema),
      400: z.object({ message: z.string() }),
    },
    query: z.object({
      skip: z.string().optional(),
      take: z.string().optional(),
      orderBy: z.string().optional(),
      isEmailSent: z.boolean().optional(),
    }),
    summary: 'get all potential customers from the database',
  },
  getEmail: {
    method: 'GET',
    path: '/early-access/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.EarlyAccessSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get an order by ID',
  },

});
