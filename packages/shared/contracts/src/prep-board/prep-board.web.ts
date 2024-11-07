import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const prepBoardContract = c.router({
  createPrepBoard: {
    method: 'POST',
    path: '/prepBoards',
    responses: {
      201: zodSchemas.PrepBoardSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.PrepBoardCreateInputSchema,
    summary: 'Create a new prep board',
  },
  getPrepBoards: {
    method: 'GET',
    path: '/prepBoards',
    responses: {
      200: z.array(zodSchemas.PrepBoardSchema),
    },
    query: z.object({
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional(),
      where: z.record(z.any()).optional(),
      orderBy: z.record(z.enum(['asc', 'desc'])).optional(),
    }),
    summary: 'Get all prep boards',
  },
  getPrepBoard: {
    method: 'GET',
    path: '/prepBoards/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.PrepBoardSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a prep board by ID',
  },
  updatePrepBoard: {
    method: 'PUT',
    path: '/prepBoards/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: zodSchemas.PrepBoardSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.PrepBoardUpdateInputSchema,
    summary: 'Update a prep board',
  },
  deletePrepBoard: {
    method: 'DELETE',
    path: '/prepBoards/:id',
    pathParams: z.object({ id: z.coerce.number() }),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a prep board',
  },
});
