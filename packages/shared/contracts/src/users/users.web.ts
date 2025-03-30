import { zodSchemas } from '@ckm/db';
import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const userContract = c.router({
  createUser: {
    method: 'POST',
    path: '/users',
    responses: {
      201: zodSchemas.UserSchema,
      400: z.object({ message: z.string() }),
    },
    body: z.intersection(zodSchemas.UserCreateInputSchema,
      z.object({
        password: z.string(),
        role: zodSchemas.UserRoleSchema.optional()
      }),
    ),
    summary: 'Create a new user',
  },

  getUsers: {
    method: 'GET',
    path: '/users',
    responses: {
      200: z.array(zodSchemas.UserSchema),
      404: z.object({ message: z.string() })
    },
    query: z.object({
      skip: z.string().optional(),
      take: z.string().optional(),
      orderBy: z.string().optional(),
    }),
    summary: 'Get all users',
  },

  getUser: {
    method: 'GET',
    path: '/users/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.UserSchema,
      404: z.object({ message: z.string() })
    },
    summary: 'Get a user by ID',
  },

  updateUser: {
    method: 'PUT',
    path: '/users/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.UserSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.UserUpdateInputSchema,
    summary: 'Update a user',
  },

  deleteUser: {
    method: 'DELETE',
    path: '/users/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.UserSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a user',
  },
});

export type UserCreateInput = z.infer<typeof zodSchemas.UserSchema>;
export type UserResponse = z.infer<typeof zodSchemas.UserUpdateInputSchema>;
