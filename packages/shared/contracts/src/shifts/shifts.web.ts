import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const shiftContract = c.router({
  createShift: {
    method: 'POST',
    path: '/shifts',
    responses: {
      201: zodSchemas.ShiftSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.ShiftUncheckedCreateInputSchema,
    summary: 'Create a new shift',
  },
  getShifts: {
    method: 'GET',
    path: '/shifts',
    responses: {
      200: z.array(zodSchemas.ShiftSchema),
      400: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
    query: z.object({
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
      userId: z.coerce.number().optional(),
      startTime: z.string().optional().pipe(z.coerce.date()),
      endTime: z.string().optional().pipe(z.coerce.date()),
      status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),
    }),
    summary: 'Get all shifts',
  },
  
  getShift: {
    method: 'GET',
    path: '/shifts/:id',
    pathParams: z.object({
        id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.ShiftSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a shift by ID',
  },
  updateShift: {
    method: 'PUT',
    path: '/shifts/:id',
    pathParams: z.object({
        id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.ShiftSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.ShiftUncheckedUpdateInputSchema,
    summary: 'Update a shift',
  },
  deleteShift: {
    method: 'DELETE',
    path: '/shifts/:id',
    pathParams: z.object({
        id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.ShiftSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a shift',
  },
});

export type Shift = z.infer<typeof zodSchemas.ShiftSchema>;
export type ShiftCreate = z.infer<typeof zodSchemas.ShiftUncheckedCreateInputSchema>;
export type ShiftUpdate = z.infer<typeof zodSchemas.ShiftUncheckedUpdateInputSchema>;
