import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { zodSchemas } from '@ckm/db';

const c = initContract()

export const organizationContract = c.router({
  createOrganization: {
    method: 'POST',
    path: '/organizations',
    responses: {
      201: zodSchemas.OrganizationSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.OrganizationCreateInputSchema,
    summary: 'Create a new organization',
  },

  getOrganizations: {
    method: 'GET',
    path: '/organizations',
    responses: {
      200: z.array(zodSchemas.OrganizationSchema),
    },
    query: z.object({
      skip: z.string().optional(),
      take: z.string().optional(),
      orderBy: z.string().optional(),
    }),
    summary: 'Get all organizations',
  },

  getOrganization: {
    method: 'GET',
    path: '/organizations/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrganizationSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get an organization by ID',
  },

  updateOrganization: {
    method: 'PUT',
    path: '/organizations/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrganizationSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.OrganizationUpdateInputSchema,
    summary: 'Update an organization',
  },

  deleteOrganization: {
    method: 'DELETE',
    path: '/organizations/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.OrganizationSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete an organization',
  },
});
